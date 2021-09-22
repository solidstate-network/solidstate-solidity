// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { EnumerableMap } from '../../../utils/EnumerableMap.sol';
import { EnumerableSet } from '../../../utils/EnumerableSet.sol';
import { ERC721BaseStorage } from '../base/ERC721BaseStorage.sol';
import { IERC721Enumerable } from './IERC721Enumerable.sol';

abstract contract ERC721Enumerable is IERC721Enumerable {
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    using EnumerableSet for EnumerableSet.UintSet;

    /**
     * @inheritdoc IERC721Enumerable
     */
    function totalSupply() public view override returns (uint256) {
        return ERC721BaseStorage.layout().tokenOwners.length();
    }

    /**
     * @inheritdoc IERC721Enumerable
     */
    function tokenOfOwnerByIndex(address owner, uint256 index)
        public
        view
        override
        returns (uint256)
    {
        return ERC721BaseStorage.layout().holderTokens[owner].at(index);
    }

    /**
     * @inheritdoc IERC721Enumerable
     */
    function tokenByIndex(uint256 index)
        public
        view
        override
        returns (uint256)
    {
        (uint256 tokenId, ) = ERC721BaseStorage.layout().tokenOwners.at(index);
        return tokenId;
    }
}
