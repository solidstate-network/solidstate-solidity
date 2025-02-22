// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Initializable } from './Initializable.sol';

contract InitializableMock is Initializable {
    function modifier_initializer() external initializer {
        // do nothing
    }

    function modifier_reinitializer(
        uint8 version
    ) external reinitializer(version) {
        // do nothing
    }

    function __setInitializedVersion(uint8 version) external {
        _setInitializedVersion(version);
    }

    function __getInitializedVersion() external view returns (uint8 version) {
        version = _getInitializedVersion();
    }
}
