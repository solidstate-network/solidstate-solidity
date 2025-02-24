// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { DiamondBeaconProxy } from './DiamondBeaconProxy.sol';

contract DiamondBeaconProxyMock is DiamondBeaconProxy {
    address private _beacon;

    constructor(address beacon) {
        setBeacon(beacon);
    }

    function _getBeacon() internal view override returns (address) {
        return _beacon;
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function __getImplementation(bytes4 sig) external view returns (address) {
        return _getImplementation(sig);
    }

    function setBeacon(address beacon) public {
        _beacon = beacon;
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
