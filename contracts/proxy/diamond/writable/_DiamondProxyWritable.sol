// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Ownable } from '../../../access/ownable/_Ownable.sol';
import { _Introspectable } from '../../../introspection/_Introspectable.sol';
import { DiamondBaseStorage } from '../../../storage/DiamondBaseStorage.sol';
import { _DiamondProxyCommon } from '../common/_DiamondProxyCommon.sol';
import { _IDiamondProxyWritable } from './_IDiamondProxyWritable.sol';

abstract contract _DiamondProxyWritable is
    _IDiamondProxyWritable,
    _DiamondProxyCommon,
    _Ownable,
    _Introspectable
{
    /**
     * TODO: standardize use of externally accessible functions with "External" suffix
     */
    function _diamondCutExternal(
        FacetCut[] memory facetCuts,
        address target,
        bytes memory data
    ) internal virtual onlyOwner {
        _diamondCut(facetCuts, target, data);
    }
}
