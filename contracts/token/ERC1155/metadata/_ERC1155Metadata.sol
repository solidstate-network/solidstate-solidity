// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { UintUtils } from '../../../utils/UintUtils.sol';
import { _IERC1155Metadata } from './_IERC1155Metadata.sol';
import { ERC1155MetadataStorage } from './ERC1155MetadataStorage.sol';

/**
 * @title ERC1155Metadata internal functions
 */
abstract contract _ERC1155Metadata is _IERC1155Metadata {
    using UintUtils for uint256;

    function _uri(
        uint256 tokenId
    ) internal view virtual returns (string memory) {
        ERC1155MetadataStorage.Layout storage l = ERC1155MetadataStorage
            .layout();

        string memory tokenURI = l.tokenURIs[tokenId];
        string memory baseURI = l.baseURI;

        if (bytes(baseURI).length == 0) {
            return tokenURI;
        } else if (bytes(tokenURI).length == 0) {
            return string(abi.encodePacked(baseURI, tokenId.toDecString()));
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
        ERC1155MetadataStorage.layout().baseURI = baseURI;
    }

    /**
     * @notice set per-token metadata URI
     * @param tokenId token whose metadata URI to set
     * @param tokenURI per-token URI
     */
    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        ERC1155MetadataStorage.layout().tokenURIs[tokenId] = tokenURI;
        emit URI(tokenURI, tokenId);
    }
}
