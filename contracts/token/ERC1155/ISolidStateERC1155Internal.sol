// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165BaseInternal } from '../../introspection/ERC165/base/IERC165BaseInternal.sol';
import { IERC1155BaseInternal } from './base/IERC1155BaseInternal.sol';
import { IERC1155EnumerableInternal } from './enumerable/IERC1155EnumerableInternal.sol';
import { IERC1155MetadataInternal } from './metadata/IERC1155MetadataInternal.sol';

interface ISolidStateERC1155Internal is
    IERC1155BaseInternal,
    IERC1155EnumerableInternal,
    IERC1155MetadataInternal,
    IERC165BaseInternal
{}
