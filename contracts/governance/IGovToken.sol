// SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

interface IGovToken {
    function getPriorVotes(address account, uint blockNumber) external view returns (uint96);
}