// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { DiamondBeaconProxy } from './DiamondBeaconProxy.sol';

contract DiamondBeaconProxyMock is DiamondBeaconProxy {
    constructor(address beacon) {
        _setBeacon(beacon);
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function __getImplementation(bytes4 sig) external view returns (address) {
        return _getImplementation(sig);
    }

    function setBeacon(address beacon) external {
        _setBeacon(beacon);
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
