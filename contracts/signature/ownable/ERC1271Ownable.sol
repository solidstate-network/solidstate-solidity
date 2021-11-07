// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { OwnableStorage } from '../../access/OwnableStorage.sol';
import { ECDSA } from '../../cryptography/ECDSA.sol';
import { ERC1271Base } from '../base/ERC1271Base.sol';
import { ERC1271OwnableInternal } from './ERC1271OwnableInternal.sol';

/**
 * @title ERC1271 implementation which delegates signing authority to ERC173 contract owner
 */
abstract contract ERC1271Ownable is ERC1271OwnableInternal, ERC1271Base {

}
