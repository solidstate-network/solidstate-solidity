// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { OwnableInternal } from '../../access/OwnableInternal.sol';
import { IDiamondCuttable } from './IDiamondCuttable.sol';
import { DiamondBaseStorage } from './DiamondBaseStorage.sol';

/**
 * @title EIP-2535 "Diamond" proxy update contract
 */
abstract contract DiamondCuttable is IDiamondCuttable, OwnableInternal {
    using DiamondBaseStorage for DiamondBaseStorage.Layout;

    /**
     * @notice update functions callable on Diamond proxy
     * @param facetCuts array of structured Diamond facet update data
     * @param target optional recipient of initialization delegatecall
     * @param data optional initialization call data
     */
    function diamondCut(
        FacetCut[] calldata facetCuts,
        address target,
        bytes calldata data
    ) external override onlyOwner {
        DiamondBaseStorage.layout().diamondCut(facetCuts, target, data);
    }
}
