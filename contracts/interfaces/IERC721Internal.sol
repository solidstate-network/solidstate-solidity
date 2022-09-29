// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

/**
 * @title Partial ERC721 interface needed by internal functions
 */
interface IERC721Internal {
    error ERC721BaseInternal__BalanceQueryZeroAddress();
    error ERC721BaseInternal__ERC721ReceiverNotImplemented();
    error ERC721BaseInternal__InvalidOwner();
    error ERC721BaseInternal__MintToZeroAddress();
    error ERC721BaseInternal__NonExistentToken();
    error ERC721BaseInternal__NotTokenOwner();
    error ERC721BaseInternal__TokenAlreadyMinted();
    error ERC721BaseInternal__TransferToZeroAddress();

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    event Approval(
        address indexed owner,
        address indexed operator,
        uint256 indexed tokenId
    );

    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );
}
