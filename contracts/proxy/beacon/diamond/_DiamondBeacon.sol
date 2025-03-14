// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Ownable } from '../../../access/ownable/_Ownable.sol';
import { _DiamondReadable } from '../../diamond/readable/_DiamondReadable.sol';
import { _DiamondProxyWritable } from '../../diamond/writable/_DiamondProxyWritable.sol';
import { _DiamondCommon } from '../../diamond/common/_DiamondCommon.sol';
import { _IDiamondBeacon } from './_IDiamondBeacon.sol';

abstract contract _DiamondBeacon is
    _IDiamondBeacon,
    _Ownable,
    _DiamondReadable,
    _DiamondProxyWritable
{
    /**
     * @inheritdoc _DiamondCommon
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
