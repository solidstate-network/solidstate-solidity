// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1271Base } from '../base/IERC1271Base.sol';
import { IERC1271OwnableInternal } from './IERC1271OwnableInternal.sol';

interface IERC1271Ownable is IERC1271OwnableInternal, IERC1271Base {}
