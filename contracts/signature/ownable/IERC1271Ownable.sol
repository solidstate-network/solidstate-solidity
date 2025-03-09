// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1271Base } from '../base/IERC1271Base.sol';
import { _IERC1271Ownable } from './_IERC1271Ownable.sol';

interface IERC1271Ownable is _IERC1271Ownable, IERC1271Base {}
