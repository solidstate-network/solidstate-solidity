// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IGovToken {
    function getPriorVotes(address account, uint blockNumber) external view returns (uint);
}