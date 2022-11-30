// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC165 } from '../../../interfaces/IERC165.sol';
import { ERC165Base, ERC165BaseStorage } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { DiamondBase } from '../base/DiamondBase.sol';
import { DiamondWritable, IDiamondWritable } from './DiamondWritable.sol';

contract DiamondWritableMock is DiamondBase, DiamondWritable, ERC165Base {
    constructor() {
        _setOwner(msg.sender);
        _setSupportsInterface(type(IERC165).interfaceId, true);
        _setSupportsInterface(type(IDiamondWritable).interfaceId, true);
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
