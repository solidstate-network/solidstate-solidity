// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

interface GovTokenInterface {
    function getPriorVotes(address account, uint blockNumber) external view returns (uint96);
}