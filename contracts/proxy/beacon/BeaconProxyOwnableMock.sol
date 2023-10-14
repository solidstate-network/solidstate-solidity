// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { BeaconProxy, BeaconProxyOwnable } from './BeaconProxyOwnable.sol';

contract BeaconProxyOwnableMock is BeaconProxyOwnable {
    constructor(address beacon, bytes4 fetchImplementationSelector) {
        setOwner(beacon);
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function __getBeacon() external view returns (address) {
        return _getBeacon();
    }

    function getOwner() external view returns (address) {
        return _owner();
    }

    function setOwner(address owner) public {
        _setOwner(owner);
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
