// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {EnumerableMap} from '../../../utils/EnumerableMap.sol';
import {EnumerableSet} from '../../../utils/EnumerableSet.sol';
import {ERC721BaseStorage} from '../base/ERC721BaseStorage.sol';
import {IERC721Enumerable} from './IERC721Enumerable.sol';

abstract contract ERC721Enumerable is IERC721Enumerable {
  using EnumerableMap for EnumerableMap.UintToAddressMap;
  using EnumerableSet for EnumerableSet.UintSet;

  /**
   * @inheritdoc IERC721Enumerable
   */
  function totalSupply () override public view returns (uint) {
    return ERC721BaseStorage.layout().tokenOwners.length();
  }

  /**
   * @inheritdoc IERC721Enumerable
   */
  function tokenOfOwnerByIndex (address owner, uint index) override public view returns (uint) {
    return ERC721BaseStorage.layout().holderTokens[owner].at(index);
  }

  /**
   * @inheritdoc IERC721Enumerable
   */
  function tokenByIndex (uint index) override public view returns (uint) {
    (uint tokenId, ) = ERC721BaseStorage.layout().tokenOwners.at(index);
    return tokenId;
  }
}
