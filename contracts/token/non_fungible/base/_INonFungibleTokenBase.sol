// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC721 } from '../../../interfaces/_IERC721.sol';
import { _IERC165Base } from '../../../introspection/ERC165/base/_IERC165Base.sol';

/**
 * @title NonFungibleToken base interface
 */
interface _INonFungibleTokenBase is _IERC721, _IERC165Base {
    error NonFungibleTokenBase__NotOwnerOrApproved();
    error NonFungibleTokenBase__SelfApproval();
    error NonFungibleTokenBase__BalanceQueryZeroAddress();
    error NonFungibleTokenBase__ERC721ReceiverNotImplemented();
    error NonFungibleTokenBase__InvalidOwner();
    error NonFungibleTokenBase__MintToZeroAddress();
    error NonFungibleTokenBase__NonExistentToken();
    error NonFungibleTokenBase__NotTokenOwner();
    error NonFungibleTokenBase__TokenAlreadyMinted();
    error NonFungibleTokenBase__TransferToZeroAddress();
}
