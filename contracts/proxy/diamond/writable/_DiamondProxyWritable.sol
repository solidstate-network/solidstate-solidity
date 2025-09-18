// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _Introspectable } from '../../../introspection/_Introspectable.sol';
import { _DiamondProxy } from '../_DiamondProxy.sol';
import { _IDiamondProxyWritable } from './_IDiamondProxyWritable.sol';

abstract contract _DiamondProxyWritable is
    _IDiamondProxyWritable,
    _DiamondProxy,
    _Introspectable
{
    /**
     * TODO: standardize use of externally accessible functions with "External" suffix
     */
    function _diamondCutExternal(
        FacetCut[] memory facetCuts,
        address target,
        bytes memory data
    ) internal virtual onlyProxyAdmin {
        _diamondCut(facetCuts, target, data);
    }
}
