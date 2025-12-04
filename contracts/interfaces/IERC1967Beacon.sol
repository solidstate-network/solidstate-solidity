// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC1967Beacon } from './_IERC1967Beacon.sol';

interface IERC1967Beacon is _IERC1967Beacon {
    /**
     * @notice query the address of the implementation that should be used by IERC1967Proxy instances
     * @return implementation address of the implementation contract
     */
    function implementation() external view returns (address implementation);
}
