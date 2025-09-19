// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ERC1155Storage } from '../../../storage/ERC1155Storage.sol';
import { Uint256 } from '../../../utils/Uint256.sol';
import { _IMultiTokenMetadata } from './_IMultiTokenMetadata.sol';

/**
 * @title MultiTokenMetadata internal functions
 */
abstract contract _MultiTokenMetadata is _IMultiTokenMetadata {
    using Uint256 for uint256;

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
            return
                string(
                    abi.encodePacked(baseURI, _generateDefaultTokenURI(tokenId))
                );
        } else {
            return string(abi.encodePacked(baseURI, tokenURI));
        }
    }

    /**
     * @notice generate URI component for token id
     * @dev padded hex string is used to match https://eips.ethereum.org/EIPS/eip-1155#metadata
     * @return tokenURI token URI component
     */
    function _generateDefaultTokenURI(
        uint256 tokenId
    ) internal view virtual returns (string memory tokenURI) {
        tokenURI = tokenId.toString(16, 64);
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
