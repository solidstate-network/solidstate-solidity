// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

interface IProxy {
    fallback() external payable;
}
