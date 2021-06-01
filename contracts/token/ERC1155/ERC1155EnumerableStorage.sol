// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {EnumerableSet} from '../../utils/EnumerableSet.sol';

library ERC1155EnumerableStorage {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.ERC1155Enumerable'
  );

  struct Layout {
    mapping (uint => uint) totalSupply;
    mapping (uint => EnumerableSet.AddressSet) accountsByToken;
    mapping (address => EnumerableSet.UintSet) tokensByAccount;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }
}
