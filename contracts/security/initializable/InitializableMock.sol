// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { Initializable } from './Initializable.sol';

contract InitializableMock is Initializable {
    bool public initializerRan;
    uint8 public reinitializerVersion;

    function __initializer() public initializer {
        initializerRan = true;
    }

    function mockReinitializer() public initializer {
        __reinitializer(2);
    }

    function __reinitializer(uint8 i) public reinitializer(i) {
        reinitializerVersion = i;
    }

    function getInitializedVersion() public view returns (uint8) {
        return _getInitializedVersion();
    }
}
