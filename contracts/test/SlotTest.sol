// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Slot } from '../data/Slot.sol';

contract SlotTest {
    function transientWriteTest(
        Slot.TransientSlot slot,
        bytes32 input
    ) external returns (bytes32 output) {
        Slot.write(slot, input);
        output = Slot.read(slot);
    }

    function transientClearTest(
        Slot.TransientSlot slot,
        bytes32 input
    ) external returns (bytes32 output) {
        Slot.write(slot, input);
        Slot.clear(slot);
        output = Slot.read(slot);
    }
}
