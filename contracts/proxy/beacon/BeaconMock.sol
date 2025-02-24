// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Beacon } from './Beacon.sol';

contract BeaconMock is Beacon {
    constructor(address owner) {
        _setOwner(owner);
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function __setImplementation(address implementation) external {
        _setImplementation(implementation);
    }
}
