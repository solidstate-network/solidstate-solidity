// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC721 } from '../../interfaces/_IERC721.sol';
import { _IIntrospectable } from '../../introspection/_IIntrospectable.sol';
import { _IMsgSenderTrick } from '../../utils/_IMsgSenderTrick.sol';

/**
 * @title NonFungibleToken base interface
 */
interface _INonFungibleToken is _IERC721, _IIntrospectable, _IMsgSenderTrick {
    error NonFungibleToken__NotOwnerOrApproved();
    error NonFungibleToken__SelfApproval();
    error NonFungibleToken__BalanceQueryZeroAddress();
    error NonFungibleToken__ERC721ReceiverNotImplemented();
    error NonFungibleToken__InvalidOwner();
    error NonFungibleToken__MintToZeroAddress();
    error NonFungibleToken__NonExistentToken();
    error NonFungibleToken__NotTokenOwner();
    error NonFungibleToken__TokenAlreadyMinted();
    error NonFungibleToken__TransferToZeroAddress();
}
