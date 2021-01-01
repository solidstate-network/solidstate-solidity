// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '@openzeppelin/contracts/utils/EnumerableSet.sol';

library LibECDSAMultisigWallet {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.ECDSAMultisigWallet'
  );

  struct Layout {
    uint quorum;
    EnumerableSet.AddressSet signers;
    mapping (address => mapping (uint => bool)) nonces;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }
}
