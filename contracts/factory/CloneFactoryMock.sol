// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { CloneFactory } from './CloneFactory.sol';

contract CloneFactoryMock is CloneFactory {
    function __deployClone() external returns (address cloneContract) {
        return _deployClone();
    }

    function __deployClone(bytes32 salt)
        external
        returns (address cloneContract)
    {
        return _deployClone(salt);
    }

    function __calculateCloneDeploymentAddress(bytes32 salt)
        external
        view
        returns (address)
    {
        return _calculateCloneDeploymentAddress(salt);
    }
}
