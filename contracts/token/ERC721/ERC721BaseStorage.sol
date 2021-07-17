// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {EnumerableMap} from '../../utils/EnumerableMap.sol';
import {EnumerableSet} from '../../utils/EnumerableSet.sol';

library ERC721BaseStorage {
  using EnumerableMap for EnumerableMap.UintToAddressMap;

  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.ERC721Base'
  );

  struct Layout {
    EnumerableMap.UintToAddressMap tokenOwners;
    mapping (address => EnumerableSet.UintSet) holderTokens;
    mapping (uint => address) tokenApprovals;
    mapping (address => mapping (address => bool)) operatorApprovals;
  }

  function exists (uint tokenId) internal view returns (bool) {
    return ERC721BaseStorage.layout().tokenOwners.contains(tokenId);
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }
}
