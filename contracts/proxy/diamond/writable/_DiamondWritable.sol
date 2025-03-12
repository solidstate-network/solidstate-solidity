// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Ownable } from '../../../access/ownable/_Ownable.sol';
import { _ERC165Base } from '../../../introspection/ERC165/base/_ERC165Base.sol';
import { DiamondBaseStorage } from '../base/DiamondBaseStorage.sol';
import { _DiamondCommon } from '../common/_DiamondCommon.sol';
import { _IDiamondWritable } from './_IDiamondWritable.sol';

abstract contract _DiamondWritable is
    _IDiamondWritable,
    _DiamondCommon,
    _Ownable,
    _ERC165Base
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
