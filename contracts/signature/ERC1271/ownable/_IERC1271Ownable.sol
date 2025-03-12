// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IERC1271Base } from '../base/_IERC1271Base.sol';

interface _IERC1271Ownable is _IERC1271Base, _IOwnable {}
