// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import '@openzeppelin/contracts/cryptography/ECDSA.sol';
import '@openzeppelin/contracts/utils/EnumerableSet.sol';

import './ECDSAMultisigWalletStorage.sol';

/**
 * @title ECDSA-verified multisig wallet contract
 */
abstract contract ECDSAMultisigWallet {
  using ECDSA for bytes32;
  using EnumerableSet for EnumerableSet.AddressSet;
  using ECDSAMultisigWalletStorage for ECDSAMultisigWalletStorage.Layout;

  struct Parameters {
    address payable target;
    bytes data;
    uint value;
    bool delegate;
  }

  struct Signature {
    bytes data;
    uint nonce;
  }

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
    return ECDSAMultisigWalletStorage.layout().isInvalidNonce(account, nonce);
  }

  /**
   * @notice invalidate nonce to prevent use of signed data payload
   * @param nonce nonce to invalidate
   */
  function invalidateNonce (
    uint nonce
  ) external {
    ECDSAMultisigWalletStorage.layout().setInvalidNonce(msg.sender, nonce);
  }

  /**
   * @notice verify signatures and execute "call" or "delegatecall" with given parameters
   * @dev message parameters must be included in signature
   * @param parameters structured call parameters (target, data, value, delegate)
   * @param signatures array of structured signature data (signature, nonce)
   */
  function verifyAndExecute (
    Parameters memory parameters,
    Signature[] memory signatures
  ) virtual public payable returns (bytes memory) {
    _verifySignatures(parameters, signatures);
    return _executeCall(parameters);
  }

  /**
   * @notice execute low-level "call" or "delegatecall"
   * @param parameters structured call parameters (target, data, value, delegate)
   */
  function _executeCall (
    Parameters memory parameters
  ) virtual internal returns (bytes memory) {
    bool success;
    bytes memory returndata;

    if (parameters.delegate) {
      require(
        parameters.value == msg.value,
        'ECDSAMultisigWallet: delegatecall value must match signed amount'
      );
      (success, returndata) = parameters.target.delegatecall(parameters.data);
    } else {
      (success, returndata) = parameters.target.call{ value: parameters.value }(parameters.data);
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

  /**
   * @notice verify eligibility of set of signatures to execute transaction
   * @dev message value and call type must be included in signature
   * @param parameters structured call parameters (target, data, value, delegate)
   * @param signatures array of structured signature data (signature, nonce)
   */
  function _verifySignatures (
    Parameters memory parameters,
    Signature[] memory signatures
  ) virtual internal {
    ECDSAMultisigWalletStorage.Layout storage l = ECDSAMultisigWalletStorage.layout();

    require(
      signatures.length >= l.quorum,
      'ECDSAMultisigWallet: quorum not reached'
    );

    address lastSigner;

    for (uint i; i < signatures.length; i++) {
      Signature memory signature = signatures[i];

      address signer = keccak256(
        abi.encodePacked(
          parameters.target,
          parameters.value,
          parameters.data,
          parameters.delegate,
          signature.nonce,
          address(this)
        )
      ).toEthSignedMessageHash().recover(signature.data);

      require(
        l.isSigner(signer),
        'ECDSAMultisigWallet: recovered signer is not authorized'
      );

      require(
        !l.isInvalidNonce(signer, signature.nonce),
        'ECDSAMultisigWallet: invalid nonce'
      );

      l.setInvalidNonce(signer, signature.nonce);

      require(
        signer > lastSigner,
        'ECDSAMultisigWallet: signatures must be ordered by signer address'
      );

      lastSigner = signer;
    }
  }
}
