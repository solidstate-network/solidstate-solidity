// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC1967Beacon } from './_IERC1967Beacon.sol';

interface IERC1967Beacon is _IERC1967Beacon {
    function implementation() external view returns (address implementation);
}
