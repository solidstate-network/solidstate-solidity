// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { Factory } from './Factory.sol';

contract FactoryMock is Factory {
    function __deploy(bytes memory initCode)
        external
        returns (address deployment)
    {
        return _deploy(initCode);
    }

    function __deploy(bytes memory initCode, bytes32 salt)
        external
        returns (address deployment)
    {
        return _deploy(initCode, salt);
    }

    function __calculateDeploymentAddress(bytes32 initCodeHash, bytes32 salt)
        external
        view
        returns (address)
    {
        return _calculateDeploymentAddress(initCodeHash, salt);
    }
}
