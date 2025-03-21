// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC1967Beacon } from './_ERC1967Beacon.sol';

interface ERC1967Beacon is _ERC1967Beacon {
    function implementation() external view returns (address implementation);
}
