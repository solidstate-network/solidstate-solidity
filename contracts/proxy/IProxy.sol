// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IProxy } from './_IProxy.sol';

interface IProxy is _IProxy {
    fallback() external payable;

    receive() external payable;
}
