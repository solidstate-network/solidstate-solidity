// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165Base } from '../../introspection/ERC165/base/IERC165Base.sol';
import { IERC721Base } from './base/IERC721Base.sol';
import { IERC721Enumerable } from './enumerable/IERC721Enumerable.sol';
import { IERC721Metadata } from './metadata/IERC721Metadata.sol';
import { _ISolidStateERC721 } from './_ISolidStateERC721.sol';

interface ISolidStateERC721 is
    _ISolidStateERC721,
    IERC721Base,
    IERC721Enumerable,
    IERC721Metadata,
    IERC165Base
{}
