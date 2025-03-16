// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { UintUtils } from '../../../utils/UintUtils.sol';
import { ERC721BaseStorage } from '../../../storage/ERC721BaseStorage.sol';
import { ERC721MetadataStorage } from '../../../storage/ERC721MetadataStorage.sol';
import { _NonFungibleTokenBase } from '../base/_NonFungibleTokenBase.sol';
import { _INonFungibleTokenMetadata } from './_INonFungibleTokenMetadata.sol';

/**
 * @title NonFungibleTokenMetadata internal functions
 */
abstract contract _NonFungibleTokenMetadata is
    _INonFungibleTokenMetadata,
    _NonFungibleTokenBase
{
    using UintUtils for uint256;

    /**
     * @notice get token name
     * @return name token name
     */
    function _name() internal view virtual returns (string memory name) {
        name = ERC721MetadataStorage
            .layout(ERC721MetadataStorage.DEFAULT_STORAGE_SLOT)
            .name;
    }

    /**
     * @notice get token symbol
     * @return symbol token symbol
     */
    function _symbol() internal view virtual returns (string memory symbol) {
        symbol = ERC721MetadataStorage
            .layout(ERC721MetadataStorage.DEFAULT_STORAGE_SLOT)
            .symbol;
    }

    /**
     * @notice get generated metatdata URI for given token
     * @return token metadata URI
     */
    function _tokenURI(
        uint256 tokenId
    ) internal view virtual returns (string memory) {
        if (!_exists(tokenId))
            revert NonFungibleTokenMetadata__NonExistentToken();

        ERC721MetadataStorage.Layout storage $ = ERC721MetadataStorage.layout(
            ERC721MetadataStorage.DEFAULT_STORAGE_SLOT
        );

        string memory tokenURI = $.tokenURIs[tokenId];
        string memory baseURI = $.baseURI;

        if (bytes(baseURI).length == 0) {
            return tokenURI;
        } else if (bytes(tokenURI).length == 0) {
            return string(abi.encodePacked(baseURI, tokenId.toDecString()));
        } else {
            return string(abi.encodePacked(baseURI, tokenURI));
        }
    }

    /**
     * @notice set token name
     * @param name token name
     */
    function _setName(string memory name) internal virtual {
        ERC721MetadataStorage
            .layout(ERC721MetadataStorage.DEFAULT_STORAGE_SLOT)
            .name = name;
    }

    /**
     * @notice set token symbol
     * @param symbol token symbol
     */
    function _setSymbol(string memory symbol) internal virtual {
        ERC721MetadataStorage
            .layout(ERC721MetadataStorage.DEFAULT_STORAGE_SLOT)
            .symbol = symbol;
    }

    /**
     * @notice set metadata URI component for single token
     * @param tokenId id of token whose URI component to set
     * @param tokenURI URI string to set
     */
    function _setTokenURI(
        uint256 tokenId,
        string memory tokenURI
    ) internal virtual {
        ERC721MetadataStorage
            .layout(ERC721MetadataStorage.DEFAULT_STORAGE_SLOT)
            .tokenURIs[tokenId] = tokenURI;
    }

    /**
     * @notice set base metadata URI
     * @param baseURI URI string to set
     */
    function _setBaseURI(string memory baseURI) internal virtual {
        ERC721MetadataStorage
            .layout(ERC721MetadataStorage.DEFAULT_STORAGE_SLOT)
            .baseURI = baseURI;
    }

    /**
     * @notice ERC721 hook: clear per-token URI data on burn
     * @inheritdoc _NonFungibleTokenBase
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (to == address(0)) {
            delete ERC721MetadataStorage
                .layout(ERC721MetadataStorage.DEFAULT_STORAGE_SLOT)
                .tokenURIs[tokenId];
        }
    }
}
