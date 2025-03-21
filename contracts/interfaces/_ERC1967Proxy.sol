// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface _ERC1967Proxy {
    event Upgraded(address indexed implementation);
    event BeaconUpgraded(address indexed beacon);
    event AdminChanged(address previousAdmin, address newAdmin);
}
