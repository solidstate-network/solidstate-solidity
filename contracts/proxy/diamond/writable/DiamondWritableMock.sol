// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ERC165, IERC165, ERC165Storage } from '../../../introspection/ERC165.sol';
import { DiamondBase } from '../base/DiamondBase.sol';
import { DiamondWritable, IDiamondWritable } from './DiamondWritable.sol';

contract DiamondWritableMock is DiamondBase, DiamondWritable, ERC165 {
    using ERC165Storage for ERC165Storage.Layout;

    constructor() {
        _setOwner(msg.sender);
        ERC165Storage.layout().setSupportedInterface(
            type(IERC165).interfaceId,
            true
        );
        ERC165Storage.layout().setSupportedInterface(
            type(IDiamondWritable).interfaceId,
            true
        );
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
