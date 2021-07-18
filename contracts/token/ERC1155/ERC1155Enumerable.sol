// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {EnumerableSet} from '../../utils/EnumerableSet.sol';
import {ERC1155Base} from './ERC1155Base.sol';
import {ERC1155EnumerableStorage} from './ERC1155EnumerableStorage.sol';
import {IERC1155Enumerable} from './IERC1155Enumerable.sol';

abstract contract ERC1155Enumerable is IERC1155Enumerable, ERC1155Base {
  using EnumerableSet for EnumerableSet.AddressSet;
  using EnumerableSet for EnumerableSet.UintSet;

  function totalSupply (uint id) public override view returns (uint) {
    return ERC1155EnumerableStorage.layout().totalSupply[id];
  }

  function totalHolders (uint id) public override view returns (uint) {
    return ERC1155EnumerableStorage.layout().accountsByToken[id].length();
  }

  function accountsByToken (uint id) public override view returns (address[] memory) {
    EnumerableSet.AddressSet storage accounts = ERC1155EnumerableStorage.layout().accountsByToken[id];

    address[] memory addresses = new address[](accounts.length());

    for (uint i; i < accounts.length(); i++) {
      addresses[i] = accounts.at(i);
    }

    return addresses;
  }

  function tokensByAccount (address account) public override view returns (uint[] memory) {
    EnumerableSet.UintSet storage tokens = ERC1155EnumerableStorage.layout().tokensByAccount[account];

    uint[] memory ids = new uint[](tokens.length());

    for (uint i; i < tokens.length(); i++) {
      ids[i] = tokens.at(i);
    }

    return ids;
  }

  function _beforeTokenTransfer (
    address operator,
    address from,
    address to,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) virtual override internal {
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

    if (from != to) {
      ERC1155EnumerableStorage.Layout storage l = ERC1155EnumerableStorage.layout();
      mapping (uint => EnumerableSet.AddressSet) storage tokenAccounts = l.accountsByToken;
      EnumerableSet.UintSet storage fromTokens = l.tokensByAccount[from];
      EnumerableSet.UintSet storage toTokens = l.tokensByAccount[to];

      for (uint i; i < ids.length; i++) {
        uint amount = amounts[i];

        if (amount > 0) {
          uint id = ids[i];

          if (from == address(0)) {
            l.totalSupply[id] += amount;
          } else if (balanceOf(from, id) == amount) {
            tokenAccounts[id].remove(from);
            fromTokens.remove(id);
          }

          if (to == address(0)) {
            l.totalSupply[id] -= amount;
          } else if (balanceOf(to, id) == 0) {
            tokenAccounts[id].add(to);
            toTokens.add(id);
          }
        }
      }
    }
  }
}
