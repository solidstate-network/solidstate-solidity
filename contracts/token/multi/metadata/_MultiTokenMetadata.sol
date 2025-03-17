// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { UintUtils } from '../../../utils/UintUtils.sol';
import { _IMultiTokenMetadata } from './_IMultiTokenMetadata.sol';
import { ERC1155Storage } from '../../../storage/ERC1155Storage.sol';

/**
 * @title MultiTokenMetadata internal functions
 */
abstract contract _MultiTokenMetadata is _IMultiTokenMetadata {
    using UintUtils for uint256;

    function _uri(
        uint256 tokenId
    ) internal view virtual returns (string memory) {
        ERC1155Storage.Layout storage $ = ERC1155Storage.layout(
            ERC1155Storage.DEFAULT_STORAGE_SLOT
        );

        string memory tokenURI = $.tokenURIs[tokenId];
        string memory baseURI = $.baseURI;

        if (bytes(baseURI).length == 0) {
            return tokenURI;
        } else if (bytes(tokenURI).length == 0) {
            return string(abi.encodePacked(baseURI, tokenId.toString(16, 64)));
        } else {
            return string(abi.encodePacked(baseURI, tokenURI));
        }
    }

    /**
     * @notice set base metadata URI
     * @dev base URI is a non-standard feature adapted from the ERC721 specification
     * @param baseURI base URI
     */
    function _setBaseURI(string memory baseURI) internal {
        ERC1155Storage
            .layout(ERC1155Storage.DEFAULT_STORAGE_SLOT)
            .baseURI = baseURI;
    }

    /**
     * @notice set per-token metadata URI
     * @param tokenId token whose metadata URI to set
     * @param tokenURI per-token URI
     */
    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        ERC1155Storage.layout(ERC1155Storage.DEFAULT_STORAGE_SLOT).tokenURIs[
            tokenId
        ] = tokenURI;
        emit URI(tokenURI, tokenId);
    }
}
