// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Introspectable } from '../../../introspection/_Introspectable.sol';
import { ERC2535Storage } from '../../../storage/ERC2535Storage.sol';
import { _DiamondProxy } from '../_DiamondProxy.sol';
import { _IDiamondProxyReadable } from './_IDiamondProxyReadable.sol';

/**
 * @title EIP-2535 "Diamond" proxy introspection contract _ functions
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
abstract contract _DiamondProxyReadable is
    _IDiamondProxyReadable,
    _DiamondProxy,
    _Introspectable
{
    /**
     * @notice get all facets and their selectors
     * @return diamondFacets array of structured facet data
     */
    function _facets() internal view returns (Facet[] memory diamondFacets) {
        ERC2535Storage.Layout storage $ = ERC2535Storage.layout(
            ERC2535Storage.DEFAULT_STORAGE_SLOT
        );

        diamondFacets = new Facet[]($.selectorCount);

        uint8[] memory numFacetSelectors = new uint8[]($.selectorCount);
        uint256 numFacets;
        uint256 selectorIndex;

        // loop through function selectors
        for (uint256 slugIndex; selectorIndex < $.selectorCount; slugIndex++) {
            bytes32 slug = $.selectorSlugs[slugIndex];

            for (
                uint256 slugSelectorIndex;
                slugSelectorIndex < 8;
                slugSelectorIndex++
            ) {
                selectorIndex++;

                if (selectorIndex > $.selectorCount) {
                    break;
                }

                bytes4 selector = bytes4(slug << (slugSelectorIndex << 5));
                address facet = address(bytes20($.selectorInfo[selector]));

                bool continueLoop;

                for (uint256 facetIndex; facetIndex < numFacets; facetIndex++) {
                    if (diamondFacets[facetIndex].target == facet) {
                        diamondFacets[facetIndex].selectors[
                            numFacetSelectors[facetIndex]
                        ] = selector;
                        // probably will never have more than 256 functions from one facet contract
                        require(numFacetSelectors[facetIndex] < 255);
                        numFacetSelectors[facetIndex]++;
                        continueLoop = true;
                        break;
                    }
                }

                if (continueLoop) {
                    continue;
                }

                diamondFacets[numFacets].target = facet;
                diamondFacets[numFacets].selectors = new bytes4[](
                    $.selectorCount
                );
                diamondFacets[numFacets].selectors[0] = selector;
                numFacetSelectors[numFacets] = 1;
                numFacets++;
            }
        }

        for (uint256 facetIndex; facetIndex < numFacets; facetIndex++) {
            uint256 numSelectors = numFacetSelectors[facetIndex];
            bytes4[] memory selectors = diamondFacets[facetIndex].selectors;

            // setting the number of selectors
            assembly {
                mstore(selectors, numSelectors)
            }
        }

        // setting the number of facets
        assembly {
            mstore(diamondFacets, numFacets)
        }
    }

    /**
     * @notice get all selectors for given facet address
     * @param facet address of facet to query
     * @return selectors array of function selectors
     */
    function _facetFunctionSelectors(
        address facet
    ) internal view returns (bytes4[] memory selectors) {
        ERC2535Storage.Layout storage $ = ERC2535Storage.layout(
            ERC2535Storage.DEFAULT_STORAGE_SLOT
        );

        // initialize array with maximum possible required length
        // it will be truncated to correct length via assembly later
        selectors = new bytes4[]($.selectorCount);

        uint256 numSelectors;
        uint256 selectorIndex;

        // loop through function selectors
        for (uint256 slugIndex; selectorIndex < $.selectorCount; slugIndex++) {
            bytes32 slug = $.selectorSlugs[slugIndex];

            for (
                uint256 slugSelectorIndex;
                slugSelectorIndex < 8;
                slugSelectorIndex++
            ) {
                selectorIndex++;

                if (selectorIndex > $.selectorCount) {
                    break;
                }

                bytes4 selector = bytes4(slug << (slugSelectorIndex << 5));

                if (facet == address(bytes20($.selectorInfo[selector]))) {
                    selectors[numSelectors] = selector;
                    numSelectors++;
                }
            }
        }

        // set the number of selectors in the array
        assembly {
            mstore(selectors, numSelectors)
        }
    }

    /**
     * @notice get addresses of all facets used by diamond
     * @return addresses array of facet addresses
     */
    function _facetAddresses()
        internal
        view
        returns (address[] memory addresses)
    {
        ERC2535Storage.Layout storage $ = ERC2535Storage.layout(
            ERC2535Storage.DEFAULT_STORAGE_SLOT
        );

        addresses = new address[]($.selectorCount);
        uint256 numFacets;
        uint256 selectorIndex;

        for (uint256 slugIndex; selectorIndex < $.selectorCount; slugIndex++) {
            bytes32 slug = $.selectorSlugs[slugIndex];

            for (
                uint256 slugSelectorIndex;
                slugSelectorIndex < 8;
                slugSelectorIndex++
            ) {
                selectorIndex++;

                if (selectorIndex > $.selectorCount) {
                    break;
                }

                bytes4 selector = bytes4(slug << (slugSelectorIndex << 5));
                address facet = address(bytes20($.selectorInfo[selector]));

                bool continueLoop;

                for (uint256 facetIndex; facetIndex < numFacets; facetIndex++) {
                    if (facet == addresses[facetIndex]) {
                        continueLoop = true;
                        break;
                    }
                }

                if (continueLoop) {
                    continue;
                }

                addresses[numFacets] = facet;
                numFacets++;
            }
        }

        // set the number of facet addresses in the array
        assembly {
            mstore(addresses, numFacets)
        }
    }

    /**
     * @notice get the address of the facet associated with given selector
     * @param selector function selector to query
     * @return facet facet address (zero address if not found)
     */
    function _facetAddress(
        bytes4 selector
    ) internal view returns (address facet) {
        facet = address(
            bytes20(
                ERC2535Storage
                    .layout(ERC2535Storage.DEFAULT_STORAGE_SLOT)
                    .selectorInfo[selector]
            )
        );
    }
}
