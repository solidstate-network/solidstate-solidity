// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165Internal } from '../../../interfaces/IERC165Internal.sol';

interface IERC165BaseInternal is IERC165Internal {
    error ERC165Base__InvalidInterfaceId();
}
