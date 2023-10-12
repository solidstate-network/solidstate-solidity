// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { BeaconProxy } from './BeaconProxy.sol';

contract BeaconProxyMock is BeaconProxy {
    address private _beacon;

    constructor(
        address beacon,
        bytes4 fetchImplementationSelector
    ) BeaconProxy(fetchImplementationSelector) {
        setBeacon(beacon);
    }

    function _getBeacon() internal view override returns (address) {
        return _beacon;
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function setBeacon(address beacon) public {
        _beacon = beacon;
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
