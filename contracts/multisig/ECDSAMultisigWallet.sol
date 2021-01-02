// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import '@openzeppelin/contracts/cryptography/ECDSA.sol';
import '@openzeppelin/contracts/utils/EnumerableSet.sol';

import './LibECDSAMultisigWallet.sol';

/**
 * @title ECDSA-verified multisig wallet contract
 */
abstract contract ECDSAMultisigWallet {
  using ECDSA for bytes32;
  using EnumerableSet for EnumerableSet.AddressSet;

  /**
   * @notice get invalidation status of nonce for given account
   * @param account address whose nonce to query
   * @param nonce nonce to query
   * @return nonce invalidation status
   */
  function isInvalidNonce (
    address account,
    uint nonce
  ) public view returns (bool) {
    return LibECDSAMultisigWallet.layout().nonces[account][nonce];
  }

  /**
   * @notice invalidate nonce to prevent use of signed data payload
   * @param nonce nonce to invalidate
   */
  function invalidateNonce (
    uint nonce
  ) external {
    LibECDSAMultisigWallet.layout().nonces[msg.sender][nonce] = true;
  }

  /**
   * @notice execute "call" to target address with given payload
   * @dev message value and call type must be included in signature
   * @param target address to call
   * @param data data payload
   * @param nonces array of nonces associated with each signature
   * @param signatures array of signatures
   */
  function callWithSignatures (
    address payable target,
    bytes memory data,
    uint value,
    uint[] calldata nonces,
    bytes[] calldata signatures
  ) external payable returns (bytes memory) {
    return _executeCall(target, data, value, nonces, signatures, false);
  }

  /**
   * @notice execute "delegatecall" to target address with given payload
   * @dev message value and call type must be included in signature
   * @param target address to delegatecall
   * @param data data payload
   * @param nonces array of nonces associated with each signature
   * @param signatures array of signatures
   */
  function delegatecallWithSignatures (
    address payable target,
    bytes memory data,
    uint[] calldata nonces,
    bytes[] calldata signatures
  ) external payable returns (bytes memory) {
    return _executeCall(target, data, 0, nonces, signatures, true);
  }

  /**
   * @notice verify eligibility of set of signatures to execute transaction
   * @dev message value and call type must be included in signature
   * @param target address to delegatecall
   * @param data data payload
   * @param nonces array of nonces associated with each signature
   * @param signatures array of signatures
   */
  function _verifySignatures (
    address payable target,
    bytes memory data,
    uint[] calldata nonces,
    bytes[] calldata signatures,
    bool delegatecall
  ) virtual internal {
    address[] memory signers = new address[](nonces.length);

    require(
      nonces.length == signatures.length,
      'ECDSAMultisigWallet: signature and nonce array lengths do not match'
    );

    LibECDSAMultisigWallet.Layout storage l = LibECDSAMultisigWallet.layout();

    require(
      nonces.length >= l.quorum,
      'ECDSAMultisigWallet: quorum not reached'
    );

    for (uint i; i < nonces.length; i++) {
      uint nonce = nonces[i];

      address signer = keccak256(
        abi.encodePacked(target, msg.value, data, delegatecall, nonce, address(this))
      ).toEthSignedMessageHash().recover(signatures[i]);

      require(
        l.signers.contains(signer),
        'ECDSAMultisigWallet: recovered signer is not authorized'
      );

      require(
        !l.nonces[signer][nonce],
        'ECDSAMultisigWallet: invalid nonce'
      );

      l.nonces[signer][nonce] = true;

      for (uint j; j < i; j++) {
        require(signer != signers[j], 'ECDSAMultisigWallet: duplicate signer found');
      }

      signers[i] = signer;
    }
  }

  /**
   * @notice verify and execute low-level "call" or "delegatecall"
   * @param target address
   * @param data data payload
   * @param value call value
   * @param nonces array of nonces associated with each signature
   * @param signatures array of signatures
   * @param delegate whether call type is "delegatecall"
   */
  function _executeCall (
    address payable target,
    bytes memory data,
    uint value,
    uint[] calldata nonces,
    bytes[] calldata signatures,
    bool delegate
  ) internal returns (bytes memory) {
    _verifySignatures(target, data, nonces, signatures, delegate);

    bool success;
    bytes memory returndata;

    if (delegate) {
      (success, returndata) = target.delegatecall(data);
    } else {
      (success, returndata) = target.call{ value: value }(data);
    }

    if (success) {
      return returndata;
    } else {
      assembly {
        returndatacopy(0, 0, returndatasize())
        revert(0, returndatasize())
      }
    }
  }
}
