// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {EnumerableSet} from '../../../utils/EnumerableSet.sol';
import {ERC1155BaseInternal, ERC1155BaseStorage} from '../base/ERC1155BaseInternal.sol';
import {ERC1155EnumerableStorage} from './ERC1155EnumerableStorage.sol';

/**
 * @title ERC1155Enumerable internal functions
 */
abstract contract ERC1155EnumerableInternal is ERC1155BaseInternal {
  using EnumerableSet for EnumerableSet.AddressSet;
  using EnumerableSet for EnumerableSet.UintSet;

  /**
   * @notice ERC1155 hook: update aggregate values
   * @inheritdoc ERC1155BaseInternal
   */
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
          } else if (_balanceOf(from, id) == amount) {
            tokenAccounts[id].remove(from);
            fromTokens.remove(id);
          }

          if (to == address(0)) {
            l.totalSupply[id] -= amount;
          } else if (_balanceOf(to, id) == 0) {
            tokenAccounts[id].add(to);
            toTokens.add(id);
          }
        }
      }
    }
  }
}
