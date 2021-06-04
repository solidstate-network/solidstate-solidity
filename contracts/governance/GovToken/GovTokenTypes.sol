// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @notice A checkpoint for marking number of votes from a given block
struct Checkpoint {
    uint32 fromBlock;
    uint votes;
}