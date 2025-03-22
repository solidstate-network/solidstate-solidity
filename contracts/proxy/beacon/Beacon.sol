// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Ownable } from '../../access/ownable/Ownable.sol';
import { IBeacon } from './IBeacon.sol';
import { _Beacon } from './_Beacon.sol';

contract Beacon is IBeacon, _Beacon, Ownable {
    /**
     * @inheritdoc IBeacon
     */
    function getImplementation()
        external
        view
        returns (address implementation)
    {
        implementation = _getImplementation();
    }

    /**
     * @inheritdoc IBeacon
     */
    function setImplementation(address implementation) external {
        _setImplementation(implementation);
    }
}
