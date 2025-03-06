// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC1271Base } from '../base/ERC1271Base.sol';
import { IERC1271Stored } from './IERC1271Stored.sol';
import { _ERC1271Stored } from './_ERC1271Stored.sol';

/**
 * @title ERC1271 implementation which validates signatures against internal storage
 */
abstract contract ERC1271Stored is
    IERC1271Stored,
    _ERC1271Stored,
    ERC1271Base
{}
