// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC721Internal } from '../../../interfaces/IERC721Internal.sol';

/**
 * @title ERC721 base interface
 */
interface IERC721BaseInternal is IERC721Internal {
    error ERC721Base__NotOwnerOrApproved();
    error ERC721Base__SelfApproval();
    error ERC721BaseInternal__BalanceQueryZeroAddress();
    error ERC721BaseInternal__ERC721ReceiverNotImplemented();
    error ERC721BaseInternal__InvalidOwner();
    error ERC721BaseInternal__MintToZeroAddress();
    error ERC721BaseInternal__NonExistentToken();
    error ERC721BaseInternal__NotTokenOwner();
    error ERC721BaseInternal__TokenAlreadyMinted();
    error ERC721BaseInternal__TransferToZeroAddress();
}
