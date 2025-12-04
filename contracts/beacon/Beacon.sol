// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { Ownable } from '../access/ownable/Ownable.sol';
import { IERC1967Beacon } from '../interfaces/IERC1967Beacon.sol';
import { _Beacon } from './_Beacon.sol';
import { IBeacon } from './IBeacon.sol';

contract Beacon is IBeacon, _Beacon, Ownable {
    /**
     * @inheritdoc IERC1967Beacon
     */
    function implementation()
        external
        view
        returns (address implementationContract)
    {
        implementationContract = _implementation();
    }

    /**
     * @inheritdoc IBeacon
     */
    function setImplementation(address implementationContract) external {
        _setImplementation(implementationContract);
    }
}
