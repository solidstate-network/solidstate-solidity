// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC165 } from '../../../interfaces/_IERC165.sol';

interface _IERC165Base is _IERC165 {
    error ERC165Base__InvalidInterfaceId();
}
