// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { EnumerableMap } from '../../../data/EnumerableMap.sol';
import { EnumerableSet } from '../../../data/EnumerableSet.sol';
import { ERC721Storage } from '../../../storage/ERC721Storage.sol';
import { _NonFungibleToken } from '../_NonFungibleToken.sol';
import {
    _INonFungibleTokenEnumerable
} from './_INonFungibleTokenEnumerable.sol';

abstract contract _NonFungibleTokenEnumerable is
    _INonFungibleTokenEnumerable,
    _NonFungibleToken
{
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    using EnumerableSet for EnumerableSet.UintSet;

    /**
     * @notice TODO
     */
    function _totalSupply() internal view returns (uint256) {
        return
            ERC721Storage
                .layout(ERC721Storage.DEFAULT_STORAGE_SLOT)
                .tokenOwners
                .length();
    }

    /**
     * @notice TODO
     */
    function _tokenOfOwnerByIndex(
        address owner,
        uint256 index
    ) internal view returns (uint256) {
        return
            ERC721Storage
                .layout(ERC721Storage.DEFAULT_STORAGE_SLOT)
                .holderTokens[owner]
                .at(index);
    }

    /**
     * @notice TODO
     */
    function _tokenByIndex(
        uint256 index
    ) internal view returns (uint256 tokenId) {
        (tokenId, ) = ERC721Storage
            .layout(ERC721Storage.DEFAULT_STORAGE_SLOT)
            .tokenOwners
            .at(index);
    }
}
