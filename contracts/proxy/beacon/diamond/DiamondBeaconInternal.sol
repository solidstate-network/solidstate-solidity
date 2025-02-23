// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { OwnableInternal } from '../../../access/ownable/OwnableInternal.sol';
import { DiamondReadableInternal } from '../../diamond/readable/DiamondReadableInternal.sol';
import { DiamondWritableInternal } from '../../diamond/writable/DiamondWritableInternal.sol';
import { IDiamondBeaconInternal } from './IDiamondBeaconInternal.sol';

abstract contract DiamondBeaconInternal is
    IDiamondBeaconInternal,
    OwnableInternal,
    DiamondReadableInternal,
    DiamondWritableInternal
{
    /**
     * @inheritdoc DiamondWritableInternal
     * @param target unused (input must be zero address)
     * @param data unused (input must be zero bytes)
     */
    function _diamondCut(
        FacetCut[] memory facetCuts,
        address target,
        bytes memory data
    ) internal virtual override {
        if (target != address(0) || data.length != 0)
            revert DiamondBeacon__InvalidInput();
        super._diamondCut(facetCuts, target, data);
    }
}
