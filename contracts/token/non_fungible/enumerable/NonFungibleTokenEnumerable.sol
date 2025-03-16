// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { EnumerableMap } from '../../../data/EnumerableMap.sol';
import { EnumerableSet } from '../../../data/EnumerableSet.sol';
import { NonFungibleToken } from '../NonFungibleToken.sol';
import { ERC721BaseStorage } from '../ERC721BaseStorage.sol';
import { INonFungibleTokenEnumerable } from './INonFungibleTokenEnumerable.sol';
import { _NonFungibleTokenEnumerable } from './_NonFungibleTokenEnumerable.sol';

abstract contract NonFungibleTokenEnumerable is
    INonFungibleTokenEnumerable,
    _NonFungibleTokenEnumerable,
    NonFungibleToken
{
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    using EnumerableSet for EnumerableSet.UintSet;

    /**
     * @inheritdoc INonFungibleTokenEnumerable
     */
    function totalSupply() external view returns (uint256) {
        return _totalSupply();
    }

    /**
     * @inheritdoc INonFungibleTokenEnumerable
     */
    function tokenOfOwnerByIndex(
        address owner,
        uint256 index
    ) external view returns (uint256) {
        return _tokenOfOwnerByIndex(owner, index);
    }

    /**
     * @inheritdoc INonFungibleTokenEnumerable
     */
    function tokenByIndex(uint256 index) external view returns (uint256) {
        return _tokenByIndex(index);
    }
}
