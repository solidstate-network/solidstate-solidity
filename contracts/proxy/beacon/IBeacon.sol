// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnable } from '../../access/ownable/IOwnable.sol';
import { _IBeacon } from './_IBeacon.sol';

interface IBeacon is _IBeacon, IOwnable {
    /**
     * @notice query the address of the implementation that should be used by BeaconProxy instances
     * @return implementation address of the implementation contract
     */
    function getImplementation() external view returns (address implementation);

    /**
     * @notice set the address of the implementation that should be used by BeaconProxy instances
     * @param implementation address of the implementation contract
     */
    function setImplementation(address implementation) external;
}
