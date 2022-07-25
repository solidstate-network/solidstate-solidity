// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { OwnableStorage } from '../../access/ownable/OwnableStorage.sol';
import { ERC1271Ownable } from './ERC1271Ownable.sol';

contract ERC1271OwnableMock is ERC1271Ownable {
    constructor(address owner) {
        OwnableStorage.layout().owner = owner;
    }

    function __isValidSignature(bytes32 hash, bytes memory signature)
        external
        view
        returns (bytes4)
    {
        return _isValidSignature(hash, signature);
    }
}
