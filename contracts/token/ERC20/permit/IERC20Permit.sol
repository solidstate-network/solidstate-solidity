// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC20Metadata } from '../metadata/IERC20Metadata.sol';
import { IERC2612 } from './IERC2612.sol';

// TODO: note that IERC20Metadata is needed for eth-permit library

interface IERC20Permit is IERC2612, IERC20Metadata {

}
