// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '../utils/EnumerableSet.sol';

library ECDSAMultisigWalletStorage {
  using EnumerableSet for EnumerableSet.AddressSet;

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

  function isInvalidNonce (
    Layout storage l,
    address account,
    uint nonce
  ) internal view returns (bool) {
    return l.nonces[account][nonce];
  }

  function setInvalidNonce (
    Layout storage l,
    address account,
    uint nonce
  ) internal {
    l.nonces[account][nonce] = true;
  }

  function setQuorum (
    Layout storage l,
    uint quorum
  ) internal {
    l.quorum = quorum;
  }

  function isSigner (
    Layout storage l,
    address account
  ) internal view returns (bool) {
    return l.signers.contains(account);
  }

  function addSigner (
    Layout storage l,
    address account
  ) internal {
    l.signers.add(account);
  }

  function removeSigner (
    Layout storage l,
    address account
  ) internal {
    l.signers.remove(account);
  }
}
