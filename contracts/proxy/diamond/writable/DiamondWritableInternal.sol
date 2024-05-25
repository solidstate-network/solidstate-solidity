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
            // selector count and slug are passed in and read back out to avoid redundant storage access
            for (uint256 i; i < facetCuts.length; i++) {
                FacetCut memory facetCut = facetCuts[i];
                FacetCutAction action = facetCut.action;

                if (facetCut.selectors.length == 0)
                    revert DiamondWritable__SelectorNotSpecified();

                if (action == FacetCutAction.ADD) {
                    (selectorCount, slug) = _addFacetSelectors(
                        l,
                        facetCut,
                        selectorCount,
                        slug
                    );
                } else if (action == FacetCutAction.REPLACE) {
                    _replaceFacetSelectors(l, facetCut);
                } else if (action == FacetCutAction.REMOVE) {
                    (selectorCount, slug) = _removeFacetSelectors(
                        l,
                        facetCut,
                        selectorCount,
                        slug
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

    /**
     * @notice add to the diamond a set of selectors associated with a particular facet
     * @dev selectors are added one-by-one to lastSlug, which is written to storage and updated to represent the subsequent slug when full
     * @dev lastSlug may be initialized with "dirty" higher-index bits, but these are ignored because they are out of range
     * @dev selectorCount and lastSlug are modified in place and returned to avoid reundant storage access
     * @param l storage pointer to the DiamondBaseStorage Layout struct
     * @param facetCut structured data representing facet address and selectors to add
     * @param selectorCount total number of selectors registered on the diamond proxy
     * @param lastSlug the last entry in the selectorSlugs mapping, cached in stack and updated in place
     * @return selectorCount after selectors have been added
     * @return lastSlug after selectors have been added
     */
    function _addFacetSelectors(
        DiamondBaseStorage.Layout storage l,
        FacetCut memory facetCut,
        uint256 selectorCount,
        bytes32 lastSlug
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

                if (l.selectorInfo[selector] != bytes32(0))
                    revert DiamondWritable__SelectorAlreadyAdded();

                // for current selector, write facet address and global index to storage
                l.selectorInfo[selector] =
                    bytes32(selectorCount) |
                    bytes20(facetCut.target);

                // calculate bit position of current selector within 256-bit slug
                uint256 selectorBitIndexInSlug = (selectorCount & 7) << 5;

                // clear a space in the slug and insert the current selector
                lastSlug = _insertSelectorIntoSlug(
                    lastSlug,
                    selector,
                    selectorBitIndexInSlug
                );

                if (selectorBitIndexInSlug == 224) {
                    // slug is now full, so write it to storage
                    l.selectorSlugs[selectorCount >> 3] = lastSlug;
                }

                selectorCount++;
            }

            return (selectorCount, lastSlug);
        }
    }

    /**
     * @notice remove from the diamond a set of selectors associated with a particular facet
     * @dev selectors are removed one-by-one from lastSlug, which is updated to represent the preceeding slug when empty
     * @dev lastSlug is not updated in storage when modified or removed, leaving "dirty" higher-index bits, but these are ignored because they are out of range
     * @dev selectorCount and lastSlug are modified in place and returned to avoid reundant storage access
     * @param l storage pointer to the DiamondBaseStorage Layout struct
     * @param facetCut structured data representing facet address and selectors to remove
     * @param selectorCount total number of selectors registered on the diamond proxy
     * @param lastSlug the last entry in the selectorSlugs mapping, cached in stack and updated in place
     * @return selectorCount after selectors have been removed
     * @return lastSlug after selectors have been removed
     */
    function _removeFacetSelectors(
        DiamondBaseStorage.Layout storage l,
        FacetCut memory facetCut,
        uint256 selectorCount,
        bytes32 lastSlug
    ) internal returns (uint256, bytes32) {
        unchecked {
            if (facetCut.target != address(0))
                revert DiamondWritable__RemoveTargetNotZeroAddress();

            for (uint256 i; i < facetCut.selectors.length; i++) {
                // selectorCount is used to derive the index of the last selector, so decrement it before each loop
                selectorCount--;

                bytes4 selector = facetCut.selectors[i];

                // lookup the selector's facet route and lookup index, then delete it from storage
                bytes32 selectorInfo = l.selectorInfo[selector];
                delete l.selectorInfo[selector];

                if (address(bytes20(selectorInfo)) == address(0))
                    revert DiamondWritable__SelectorNotFound();

                if (address(bytes20(selectorInfo)) == address(this))
                    revert DiamondWritable__SelectorIsImmutable();

                if (selectorCount & 7 == 7) {
                    // the last selector is located at the end of the last slug, which has not been loaded yet
                    lastSlug = l.selectorSlugs[selectorCount >> 3];
                }

                // extract the last selector from the last slug
                // it will be used to overwrite the selector being removed
                bytes4 lastSelector = bytes4(
                    lastSlug << ((selectorCount & 7) << 5)
                );

                if (lastSelector != selector) {
                    // update last selector's index to match removed selector's index, where last selector is being moved
                    l.selectorInfo[lastSelector] =
                        (selectorInfo & CLEAR_ADDRESS_MASK) |
                        bytes20(l.selectorInfo[lastSelector]);
                }

                // derive the index of the slug where the selector is stored
                uint256 slugIndex = uint16(uint256(selectorInfo)) >> 3;
                // derive the position of the selector within its slug
                uint256 selectorBitIndexInSlug = (uint16(
                    uint256(selectorInfo)
                ) & 7) << 5;

                // overwrite the selector being deleted with the last selector in the array

                if (slugIndex == selectorCount >> 3) {
                    // selector being removed is from the last slug, which has already been loaded to the stack
                    // slug needs not be written to storage yet because it is being tracked on the stack and will be written later
                    lastSlug = _insertSelectorIntoSlug(
                        lastSlug,
                        lastSelector,
                        selectorBitIndexInSlug
                    );
                } else {
                    // selector being removed is from a slug that hasn't been loaded to the stack
                    // slug must be updated in storage now because it isn't being tracked on the stack
                    l.selectorSlugs[slugIndex] = _insertSelectorIntoSlug(
                        l.selectorSlugs[slugIndex],
                        lastSelector,
                        selectorBitIndexInSlug
                    );
                }
            }

            return (selectorCount, lastSlug);
        }
    }

    /**
     * @notice replace in the diamond a set of selectors associated with a particular facet
     * @param l storage pointer to the DiamondBaseStorage Layout struct
     * @param facetCut structured data representing facet address and selectors to replace
     */
    function _replaceFacetSelectors(
        DiamondBaseStorage.Layout storage l,
        FacetCut memory facetCut
    ) internal {
        unchecked {
            if (!facetCut.target.isContract())
                revert DiamondWritable__TargetHasNoCode();

            for (uint256 i; i < facetCut.selectors.length; i++) {
                bytes4 selector = facetCut.selectors[i];
                bytes32 selectorInfo = l.selectorInfo[selector];
                address oldFacetAddress = address(bytes20(selectorInfo));

                if (oldFacetAddress == address(0))
                    revert DiamondWritable__SelectorNotFound();
                if (oldFacetAddress == address(this))
                    revert DiamondWritable__SelectorIsImmutable();
                if (oldFacetAddress == facetCut.target)
                    revert DiamondWritable__ReplaceTargetIsIdentical();

                // replace old facet address
                l.selectorInfo[selector] =
                    (selectorInfo & CLEAR_ADDRESS_MASK) |
                    bytes20(facetCut.target);
            }
        }
    }

    /**
     * @notice run an optional post-diamond-cut initialization transation via delegatecall
     * @dev the target and data parameters must both be zero, or both be non-zero
     * @param target contract address to which call shall be delegated
     * @param data encoded delegatecall transaction data
     */
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

    /**
     * @notice insert 4-byte function selector into 32-byte selector slug at given bit position
     * @param slug 32-byte sequence of up to 8 function selectors
     * @param selector function selector to insert
     * @param bitIndex bit position of selector within slug (must be multiple of 32)
     */
    function _insertSelectorIntoSlug(
        bytes32 slug,
        bytes4 selector,
        uint256 bitIndex
    ) private pure returns (bytes32) {
        return
            (slug & ~(CLEAR_SELECTOR_MASK >> bitIndex)) |
            (bytes32(selector) >> bitIndex);
    }
}
