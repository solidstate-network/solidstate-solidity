// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IProxy {
    error Proxy__ImplementationIsNotContract();

    fallback() external payable;
}
