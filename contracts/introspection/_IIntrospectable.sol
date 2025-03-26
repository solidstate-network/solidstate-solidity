// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC165 } from '../interfaces/_IERC165.sol';

interface _IIntrospectable is _IERC165 {
    error Introspectable__InvalidInterfaceId();
}
