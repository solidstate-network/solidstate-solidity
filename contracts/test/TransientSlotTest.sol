// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { tslot } from '../data/TransientSlot.sol';

contract TransientSlotTest {
    function transientWriteTest(
        tslot slot,
        bytes32 input
    ) external returns (bytes32 output) {
        slot.write(input);
        output = slot.read();
    }

    function transientClearTest(
        tslot slot,
        bytes32 input
    ) external returns (bytes32 output) {
        slot.write(input);
        slot.clear();
        output = slot.read();
    }
}
