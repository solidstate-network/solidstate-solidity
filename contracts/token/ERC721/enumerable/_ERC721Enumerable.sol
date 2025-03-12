// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { EnumerableMap } from '../../../data/EnumerableMap.sol';
import { EnumerableSet } from '../../../data/EnumerableSet.sol';
import { _ERC721Base } from '../base/_ERC721Base.sol';
import { ERC721BaseStorage } from '../base/ERC721BaseStorage.sol';
import { _IERC721Enumerable } from './_IERC721Enumerable.sol';

abstract contract _ERC721Enumerable is _IERC721Enumerable, _ERC721Base {
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    using EnumerableSet for EnumerableSet.UintSet;

    /**
     * @notice TODO
     */
    function _totalSupply() internal view returns (uint256) {
        return
            ERC721BaseStorage
                .layout(ERC721BaseStorage.DEFAULT_STORAGE_SLOT)
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
            ERC721BaseStorage
                .layout(ERC721BaseStorage.DEFAULT_STORAGE_SLOT)
                .holderTokens[owner]
                .at(index);
    }

    /**
     * @notice TODO
     */
    function _tokenByIndex(
        uint256 index
    ) internal view returns (uint256 tokenId) {
        (tokenId, ) = ERC721BaseStorage
            .layout(ERC721BaseStorage.DEFAULT_STORAGE_SLOT)
            .tokenOwners
            .at(index);
    }
}
