// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC721Base } from '../base/_IERC721Base.sol';

/**
 * @title ERC721Metadata internal interface
 */
interface _IERC721Metadata is _IERC721Base {
    error ERC721Metadata__NonExistentToken();
}
