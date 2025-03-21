// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC1967Storage } from '../storage/ERC1967Storage.sol';

abstract contract ERC1967StorageTest {
    function setImplementation(address implementation) external {
        ERC1967Storage.layout().implementation = implementation;
    }

    function setBeacon(address beacon) external {
        ERC1967Storage.layout().beacon = beacon;
    }

    function setAdmin(address admin) external {
        ERC1967Storage.layout().admin = admin;
    }
}
