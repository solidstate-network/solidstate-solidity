// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { OwnableStorage } from '../../../access/ownable/OwnableStorage.sol';
import { ERC165, IERC165, ERC165Storage } from '../../../introspection/ERC165.sol';
import { DiamondBase } from '../base/DiamondBase.sol';
import { DiamondWritable, IDiamondWritable } from './DiamondWritable.sol';

contract DiamondWritableMock is DiamondBase, DiamondWritable, ERC165 {
    using OwnableStorage for OwnableStorage.Layout;
    using ERC165Storage for ERC165Storage.Layout;

    constructor() {
        OwnableStorage.layout().setOwner(msg.sender);
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
