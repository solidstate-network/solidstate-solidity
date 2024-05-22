// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { AddressUtils } from '../../../utils/AddressUtils.sol';
import { DiamondBaseStorage } from '../base/DiamondBaseStorage.sol';
import { IDiamondWritableInternal } from './IDiamondWritableInternal.sol';

abstract contract DiamondWritableInternal is IDiamondWritableInternal {
    using AddressUtils for address;

    bytes32 private constant CLEAR_ADDRESS_MASK =
        bytes32(uint256(0xffffffffffffffffffffffff));
    bytes32 private constant CLEAR_SELECTOR_MASK =
        bytes32(uint256(0xffffffff << 224));

    /**
     * @notice update functions callable on Diamond proxy
     * @param facetCuts array of structured Diamond facet update data
     * @param target optional recipient of initialization delegatecall
     * @param data optional initialization call data
     */
    function _diamondCut(
        FacetCut[] memory facetCuts,
        address target,
        bytes memory data
    ) internal virtual {
        DiamondBaseStorage.Layout storage l = DiamondBaseStorage.layout();

        unchecked {
            // record selector count at start of operation for later comparison
            uint256 originalSelectorCount = l.selectorCount;
            // maintain an up-to-date selector count in the stack
            uint256 selectorCount = originalSelectorCount;
            // declare a 32-byte sequence of up to 8 function selectors
            bytes32 slug;

            // if selector count is not a multiple of 8, load the last slug because it is not full
            // else leave the default zero-bytes value as is, and use it as a new slug
            if (selectorCount & 7 != 0) {
                slug = l.selectorSlugs[selectorCount >> 3];
            }

            // process each facet cut struct according to its action
            // selector count and slug are passed in and read back out to avoid duplicate storage reads
            for (uint256 i; i < facetCuts.length; i++) {
                FacetCut memory facetCut = facetCuts[i];
                FacetCutAction action = facetCut.action;

                if (facetCut.selectors.length == 0)
                    revert DiamondWritable__SelectorNotSpecified();

                if (action == FacetCutAction.ADD) {
                    (selectorCount, slug) = _addFacetSelectors(
                        l,
                        selectorCount,
                        slug,
                        facetCut
                    );
                } else if (action == FacetCutAction.REPLACE) {
                    _replaceFacetSelectors(l, facetCut);
                } else if (action == FacetCutAction.REMOVE) {
                    (selectorCount, slug) = _removeFacetSelectors(
                        l,
                        selectorCount,
                        slug,
                        facetCut
                    );
                }
            }

            // if selector count has changed, update it in storage
            if (selectorCount != originalSelectorCount) {
                l.selectorCount = uint16(selectorCount);
            }

            // if final selector count is not a multiple of 8, write the slug to storage
            // else it was already written to storage by the add/remove loops
            if (selectorCount & 7 != 0) {
                l.selectorSlugs[selectorCount >> 3] = slug;
            }

            // event must be emitted before initializer is called, in case initializer triggers further diamond cuts
            emit DiamondCut(facetCuts, target, data);
            _initialize(target, data);
        }
    }

    function _addFacetSelectors(
        DiamondBaseStorage.Layout storage l,
        uint256 selectorCount,
        bytes32 slug,
        FacetCut memory facetCut
    ) internal returns (uint256, bytes32) {
        unchecked {
            if (facetCut.target.isContract()) {
                if (facetCut.target == address(this)) {
                    revert DiamondWritable__SelectorIsImmutable();
                }
            } else if (facetCut.target != address(this)) {
                revert DiamondWritable__TargetHasNoCode();
            }

            for (uint256 i; i < facetCut.selectors.length; i++) {
                bytes4 selector = facetCut.selectors[i];
                bytes32 oldFacet = l.selectorInfo[selector];

                if (address(bytes20(oldFacet)) != address(0))
                    revert DiamondWritable__SelectorAlreadyAdded();

                // for current selector, write facet address and global index to storage
                l.selectorInfo[selector] =
                    bytes32(selectorCount) |
                    bytes20(facetCut.target);

                // calculate bit position of current selector within 256-bit slug
                uint256 selectorBitIndexInSlug = (selectorCount & 7) << 5;

                // clear a space in the slug and insert the current selector
                slug = _overwriteSelector(
                    slug,
                    selector,
                    selectorBitIndexInSlug
                );

                // if slug is now full, write it to storage and continue with an empty slug
                if (selectorBitIndexInSlug == 224) {
                    l.selectorSlugs[selectorCount >> 3] = slug;
                    slug = bytes32(0);
                }

                selectorCount++;
            }

            return (selectorCount, slug);
        }
    }

    function _removeFacetSelectors(
        DiamondBaseStorage.Layout storage l,
        uint256 selectorCount,
        bytes32 lastSlug,
        FacetCut memory facetCut
    ) internal returns (uint256, bytes32) {
        unchecked {
            if (facetCut.target != address(0))
                revert DiamondWritable__RemoveTargetNotZeroAddress();

            // calculate the index of the last slug, which may be empty
            uint256 lastSlugIndex = selectorCount >> 3;
            // calculate the index of the last selector, which may be empty if the last slug is empty
            uint256 lastSelectorIndexInSlug = selectorCount & 7;

            for (uint256 i; i < facetCut.selectors.length; i++) {
                bytes4 selector = facetCut.selectors[i];

                // lookup the selector's facet route and lookup index, then delete it from storage
                bytes32 oldFacet = l.selectorInfo[selector];
                delete l.selectorInfo[selector];

                if (address(bytes20(oldFacet)) == address(0))
                    revert DiamondWritable__SelectorNotFound();

                if (address(bytes20(oldFacet)) == address(this))
                    revert DiamondWritable__SelectorIsImmutable();

                // decrement index of last selector and, if necessary, slug

                if (lastSlug == bytes32(0)) {
                    lastSlugIndex--;
                    lastSlug = l.selectorSlugs[lastSlugIndex];
                    lastSelectorIndexInSlug = 7;
                } else {
                    lastSelectorIndexInSlug--;
                }

                // extract the last selector from the last slug
                // it will be used to overwrite the selector being removed
                bytes4 lastSelector = bytes4(
                    lastSlug << (lastSelectorIndexInSlug << 5)
                );

                if (lastSelector != selector) {
                    // update last slug position info
                    l.selectorInfo[lastSelector] =
                        (oldFacet & CLEAR_ADDRESS_MASK) |
                        bytes20(l.selectorInfo[lastSelector]);
                }

                uint256 slugIndex = uint16(uint256(oldFacet)) >> 3;
                uint256 selectorBitIndexInSlug = (uint16(uint256(oldFacet)) &
                    7) << 5;

                // overwrite the selector being deleted with the last selector in the array

                if (slugIndex == lastSlugIndex) {
                    // selector is being removed from the last slug, which has already been loaded
                    // slug needs not be written to storage because it continues to be tracked
                    lastSlug = _overwriteSelector(
                        lastSlug,
                        lastSelector,
                        selectorBitIndexInSlug
                    );
                } else {
                    // selector is being removed from a slug that hasn't been loaded yet
                    // slug must be updated in storage because it isn't otherwise being tracked
                    l.selectorSlugs[slugIndex] = _overwriteSelector(
                        l.selectorSlugs[slugIndex],
                        lastSelector,
                        selectorBitIndexInSlug
                    );
                }

                // if slug is now empty, delete it from storage and continue with an empty slug
                if (lastSelectorIndexInSlug == 0) {
                    delete l.selectorSlugs[lastSlugIndex];
                    lastSlug = bytes32(0);
                }
            }

            selectorCount = (lastSlugIndex << 3) | lastSelectorIndexInSlug;

            return (selectorCount, lastSlug);
        }
    }

    function _replaceFacetSelectors(
        DiamondBaseStorage.Layout storage l,
        FacetCut memory facetCut
    ) internal {
        unchecked {
            if (!facetCut.target.isContract())
                revert DiamondWritable__TargetHasNoCode();

            for (uint256 i; i < facetCut.selectors.length; i++) {
                bytes4 selector = facetCut.selectors[i];
                bytes32 oldFacet = l.selectorInfo[selector];
                address oldFacetAddress = address(bytes20(oldFacet));

                if (oldFacetAddress == address(0))
                    revert DiamondWritable__SelectorNotFound();
                if (oldFacetAddress == address(this))
                    revert DiamondWritable__SelectorIsImmutable();
                if (oldFacetAddress == facetCut.target)
                    revert DiamondWritable__ReplaceTargetIsIdentical();

                // replace old facet address
                l.selectorInfo[selector] =
                    (oldFacet & CLEAR_ADDRESS_MASK) |
                    bytes20(facetCut.target);
            }
        }
    }

    function _initialize(address target, bytes memory data) private {
        if ((target == address(0)) != (data.length == 0))
            revert DiamondWritable__InvalidInitializationParameters();

        if (target != address(0)) {
            if (target != address(this)) {
                if (!target.isContract())
                    revert DiamondWritable__TargetHasNoCode();
            }

            (bool success, ) = target.delegatecall(data);

            if (!success) {
                assembly {
                    returndatacopy(0, 0, returndatasize())
                    revert(0, returndatasize())
                }
            }
        }
    }

    function _overwriteSelector(
        bytes32 slug,
        bytes4 selector,
        uint256 bitIndex
    ) private pure returns (bytes32) {
        return
            (slug & ~(CLEAR_SELECTOR_MASK >> bitIndex)) |
            (bytes32(selector) >> bitIndex);
    }
}
