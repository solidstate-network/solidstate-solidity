// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2535DiamondCut } from '../../../interfaces/IERC2535DiamondCut.sol';
import { Introspectable } from '../../../introspection/Introspectable.sol';
import { DiamondCommon } from '../common/DiamondCommon.sol';
import { IDiamondProxyWritable } from './IDiamondProxyWritable.sol';
import { _DiamondProxyWritable } from './_DiamondProxyWritable.sol';

/**
 * @title EIP-2535 "Diamond" proxy update contract
 */
abstract contract DiamondProxyWritable is
    IDiamondProxyWritable,
    _DiamondProxyWritable,
    DiamondCommon,
    Introspectable
{
    /**
     * @inheritdoc IERC2535DiamondCut
     */
    function diamondCut(
        FacetCut[] calldata facetCuts,
        address target,
        bytes calldata data
    ) external {
        _diamondCutExternal(facetCuts, target, data);
    }
}
