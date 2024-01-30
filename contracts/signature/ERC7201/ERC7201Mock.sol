// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import { ERC7201 } from './ERC7201.sol';

contract ERC7201Mock {
    function calculateStorageSlot(
        string calldata id
    ) external pure returns (bytes32 slot) {
        slot = ERC7201.calculateStorageSlot(id);
    }
}
