// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC165 } from '../../../interfaces/IERC165.sol';
import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { DiamondBase } from '../base/DiamondBase.sol';
import { DiamondWritableInternal } from '../writable/DiamondWritableInternal.sol';
import { DiamondReadable, IDiamondReadable } from './DiamondReadable.sol';

contract DiamondReadableMock is
    DiamondBase,
    DiamondReadable,
    DiamondWritableInternal,
    ERC165Base
{
    constructor(FacetCut[] memory cuts) {
        _diamondCut(cuts, address(0), '');
        _setSupportsInterface(type(IERC165).interfaceId, true);
        _setSupportsInterface(type(IDiamondReadable).interfaceId, true);
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
