// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

interface _IERC1967Proxy {
    event Upgraded(address indexed implementation);
    event BeaconUpgraded(address indexed beacon);
    event AdminChanged(address previousAdmin, address newAdmin);
}
