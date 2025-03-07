// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { BeaconProxy } from './BeaconProxy.sol';

contract BeaconProxyMock is BeaconProxy {
    address private _beacon;

    constructor(address beacon) {
        _setBeacon(beacon);
    }

    function _getBeacon() internal view override returns (address) {
        return _beacon;
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function setBeacon(address beacon) external {
        _setBeacon(beacon);
    }

    function _setBeacon(address beacon) private {
        _beacon = beacon;
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
