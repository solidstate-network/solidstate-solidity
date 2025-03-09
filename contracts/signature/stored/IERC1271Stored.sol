// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1271Base } from '../base/IERC1271Base.sol';
import { _IERC1271Stored } from './_ERC1271Stored.sol';

interface IERC1271Stored is _IERC1271Stored, IERC1271Base {}
