// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC721 } from '../../../interfaces/IERC721.sol';
import { IERC165Base } from '../../../introspection/ERC165/base/IERC165Base.sol';
import { _IERC721Base } from './_IERC721Base.sol';

/**
 * @title ERC721 base interface
 */
interface IERC721Base is _IERC721Base, IERC721, IERC165Base {}
