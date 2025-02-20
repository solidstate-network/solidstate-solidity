// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC721BaseInternal } from './base/IERC721BaseInternal.sol';
import { IERC721EnumerableInternal } from './enumerable/IERC721EnumerableInternal.sol';
import { IERC721MetadataInternal } from './metadata/IERC721MetadataInternal.sol';

interface ISolidStateERC721Internal is
    IERC721BaseInternal,
    IERC721EnumerableInternal,
    IERC721MetadataInternal
{
    error SolidStateERC721__PayableApproveNotSupported();
    error SolidStateERC721__PayableTransferNotSupported();
}
