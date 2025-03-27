// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _Ownable } from '../../access/ownable/_Ownable.sol';
import { BeaconStorage } from '../../storage/BeaconStorage.sol';
import { _IBeacon } from './_IBeacon.sol';

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
        implementation = BeaconStorage
            .layout(BeaconStorage.DEFAULT_STORAGE_SLOT)
            .implementation;
    }

    /**
     * @notice set the address of the implementation that should be used by BeaconProxy instances
     * @param implementation address of the implementation contract
     */
    function _setImplementation(
        address implementation
    ) internal virtual onlyOwner {
        BeaconStorage
            .layout(BeaconStorage.DEFAULT_STORAGE_SLOT)
            .implementation = implementation;
    }
}
