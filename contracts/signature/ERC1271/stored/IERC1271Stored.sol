// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1271Base } from '../base/IERC1271Base.sol';
import { IERC1271StoredInternal } from './ERC1271StoredInternal.sol';

interface IERC1271Stored is IERC1271StoredInternal, IERC1271Base {}
