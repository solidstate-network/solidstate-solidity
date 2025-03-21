// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnable } from '../../access/ownable/IOwnable.sol';
import { IERC1967Beacon } from '../../interfaces/IERC1967Beacon.sol';
import { _IBeacon } from './_IBeacon.sol';

interface IBeacon is _IBeacon, IERC1967Beacon, IOwnable {
    /**
     * @notice set the address of the implementation that should be used by BeaconProxy instances
     * @param implementationContract address of the implementation contract
     */
    function setImplementation(address implementationContract) external;
}
