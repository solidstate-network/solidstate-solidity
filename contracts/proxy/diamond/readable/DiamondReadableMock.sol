// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ERC165, IERC165, ERC165Storage } from '../../../introspection/ERC165.sol';
import { DiamondBase } from '../base/DiamondBase.sol';
import { DiamondWritableInternal } from '../writable/DiamondWritableInternal.sol';
import { DiamondReadable, IDiamondReadable } from './DiamondReadable.sol';

contract DiamondReadableMock is
    DiamondBase,
    DiamondReadable,
    DiamondWritableInternal,
    ERC165
{
    using ERC165Storage for ERC165Storage.Layout;

    constructor(FacetCut[] memory cuts) {
        _diamondCut(cuts, address(0), '');
        ERC165Storage.layout().setSupportedInterface(
            type(IERC165).interfaceId,
            true
        );
        ERC165Storage.layout().setSupportedInterface(
            type(IDiamondReadable).interfaceId,
            true
        );
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
