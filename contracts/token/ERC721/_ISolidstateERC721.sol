// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC721Base } from './base/_IERC721Base.sol';
import { _IERC721Enumerable } from './enumerable/_IERC721Enumerable.sol';
import { _IERC721Metadata } from './metadata/_IERC721Metadata.sol';

interface _ISolidstateERC721 is
    _IERC721Base,
    _IERC721Enumerable,
    _IERC721Metadata
{
    error SolidstateERC721__PayableApproveNotSupported();
    error SolidstateERC721__PayableTransferNotSupported();
}
