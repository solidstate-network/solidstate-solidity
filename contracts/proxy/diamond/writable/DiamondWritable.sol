// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2535DiamondCut } from '../../../interfaces/IERC2535DiamondCut.sol';
import { OwnableInternal } from '../../../access/ownable/OwnableInternal.sol';
import { IDiamondWritable } from './IDiamondWritable.sol';
import { DiamondWritableInternal } from './DiamondWritableInternal.sol';

/**
 * @title EIP-2535 "Diamond" proxy update contract
 */
abstract contract DiamondWritable is
    IDiamondWritable,
    DiamondWritableInternal,
    OwnableInternal
{
    /**
     * @inheritdoc IERC2535DiamondCut
     */
    function diamondCut(
        FacetCut[] calldata facetCuts,
        address target,
        bytes calldata data
    ) external onlyOwner {
        _diamondCut(facetCuts, target, data);
    }
}
