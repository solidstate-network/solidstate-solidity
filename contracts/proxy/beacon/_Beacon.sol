// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Ownable } from '../../access/ownable/_Ownable.sol';
import { _IBeacon } from './_IBeacon.sol';
import { BeaconStorage } from './BeaconStorage.sol';

abstract contract _Beacon is _IBeacon, _Ownable {
    /**
     * @notice query the address of the implementation that should be used by BeaconProxy instances
     * @return implementation address of the implementation contract
     */
    function _getImplementation()
        internal
        view
        virtual
        returns (address implementation)
    {
        implementation = BeaconStorage.layout().implementation;
    }

    /**
     * @notice set the address of the implementation that should be used by BeaconProxy instances
     * @param implementation address of the implementation contract
     */
    function _setImplementation(
        address implementation
    ) internal virtual onlyOwner {
        BeaconStorage.layout().implementation = implementation;
    }
}
