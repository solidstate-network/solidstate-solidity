// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { BeaconProxy } from './BeaconProxy.sol';

contract BeaconProxyMock is BeaconProxy {
    constructor(address beacon) {
        _setBeacon(beacon);
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function setBeacon(address beacon) external {
        _setBeacon(beacon);
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
