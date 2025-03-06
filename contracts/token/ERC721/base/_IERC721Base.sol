// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC721 } from '../../../interfaces/_IERC721.sol';

/**
 * @title ERC721 base interface
 */
interface _IERC721Base is _IERC721 {
    error ERC721Base__NotOwnerOrApproved();
    error ERC721Base__SelfApproval();
    error ERC721Base__BalanceQueryZeroAddress();
    error ERC721Base__ERC721ReceiverNotImplemented();
    error ERC721Base__InvalidOwner();
    error ERC721Base__MintToZeroAddress();
    error ERC721Base__NonExistentToken();
    error ERC721Base__NotTokenOwner();
    error ERC721Base__TokenAlreadyMinted();
    error ERC721Base__TransferToZeroAddress();
}
