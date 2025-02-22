// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165 } from '../../../interfaces/IERC165.sol';
import { IERC2535DiamondLoupe } from '../../../interfaces/IERC2535DiamondLoupe.sol';
import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { DiamondBase } from '../base/DiamondBase.sol';
import { DiamondWritableInternal } from '../writable/DiamondWritableInternal.sol';
import { DiamondReadable } from './DiamondReadable.sol';

contract DiamondReadableMock is
    DiamondBase,
    DiamondReadable,
    DiamondWritableInternal,
    ERC165Base
{
    constructor(FacetCut[] memory cuts) {
        _diamondCut(cuts, address(0), '');
        _setSupportsInterface(type(IERC165).interfaceId, true);
        _setSupportsInterface(type(IERC2535DiamondLoupe).interfaceId, true);
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
