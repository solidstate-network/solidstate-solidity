// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {EnumerableSet} from '../../../utils/EnumerableSet.sol';
import {ERC1155Base, ERC1155BaseInternal} from '../base/ERC1155Base.sol';
import {IERC1155Enumerable} from './IERC1155Enumerable.sol';
import {ERC1155EnumerableInternal, ERC1155EnumerableStorage} from './ERC1155EnumerableInternal.sol';

/**
 * @title ERC1155 implementation including enumerable and aggregate functions
 */
abstract contract ERC1155Enumerable is IERC1155Enumerable, ERC1155Base, ERC1155EnumerableInternal {
  using EnumerableSet for EnumerableSet.AddressSet;
  using EnumerableSet for EnumerableSet.UintSet;

  /**
   * @inheritdoc IERC1155Enumerable
   */
  function totalSupply (uint id) virtual override public view returns (uint) {
    return ERC1155EnumerableStorage.layout().totalSupply[id];
  }

  /**
   * @inheritdoc IERC1155Enumerable
   */
  function totalHolders (uint id) virtual override public view returns (uint) {
    return ERC1155EnumerableStorage.layout().accountsByToken[id].length();
  }

  /**
   * @inheritdoc IERC1155Enumerable
   */
  function accountsByToken (uint id) virtual override public view returns (address[] memory) {
    EnumerableSet.AddressSet storage accounts = ERC1155EnumerableStorage.layout().accountsByToken[id];

    address[] memory addresses = new address[](accounts.length());

    for (uint i; i < accounts.length(); i++) {
      addresses[i] = accounts.at(i);
    }

    return addresses;
  }

  /**
   * @inheritdoc IERC1155Enumerable
   */
  function tokensByAccount (address account) virtual override public view returns (uint[] memory) {
    EnumerableSet.UintSet storage tokens = ERC1155EnumerableStorage.layout().tokensByAccount[account];

    uint[] memory ids = new uint[](tokens.length());

    for (uint i; i < tokens.length(); i++) {
      ids[i] = tokens.at(i);
    }

    return ids;
  }

  /**
   * @notice ERC1155 hook: update aggregate values
   * @inheritdoc ERC1155EnumerableInternal
   */
  function _beforeTokenTransfer (
    address operator,
    address from,
    address to,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) virtual override(ERC1155BaseInternal, ERC1155EnumerableInternal) internal {
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }
}
