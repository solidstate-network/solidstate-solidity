// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC1271Base } from '../base/ERC1271Base.sol';
import { ERC1271StoredInternal, ERC1271StoredStorage } from './ERC1271StoredInternal.sol';

/**
 * @title ERC1271 implementation which validates signatures against internal storage
 */
abstract contract ERC1271Stored is ERC1271StoredInternal, ERC1271Base {

}
