// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnable } from '../../../access/ownable/IOwnable.sol';
import { IDiamondProxyWritable } from '../../diamond/writable/IDiamondProxyWritable.sol';
import { _IDiamondBeacon } from './_IDiamondBeacon.sol';

interface IDiamondBeacon is _IDiamondBeacon, IDiamondProxyWritable, IOwnable {
    /**
     * @notice query the address of the implementation that should be used by IERC1967Proxy instances
     * @param selector function selector whose implementation to query
     * @return implementation address of the implementation contract
     */
    function implementation(
        bytes4 selector
    ) external view returns (address implementation);
}
