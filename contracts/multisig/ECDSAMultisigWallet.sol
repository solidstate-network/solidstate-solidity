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
   * @notice execute "call" to target address with given payload
   * @dev message parameters must be included in signature
   * @param parameters structured call parameters (target, data, value, delegate)
   * @param nonces array of nonces associated with each signature
   * @param signatures array of signatures
   */
  function callWithSignatures (
    Parameters memory parameters,
    uint[] calldata nonces,
    bytes[] calldata signatures
  ) external payable returns (bytes memory) {
    return _executeCall(parameters, nonces, signatures);
  }

  /**
   * @notice execute "delegatecall" to target address with given payload
   * @dev message parameters must be included in signature
   * @param parameters structured call parameters (target, data, value, delegate)
   * @param nonces array of nonces associated with each signature
   * @param signatures array of signatures
   */
  function delegatecallWithSignatures (
    Parameters memory parameters,
    uint[] calldata nonces,
    bytes[] calldata signatures
  ) external payable returns (bytes memory) {
    return _executeCall(parameters, nonces, signatures);
  }

  /**
   * @notice verify and execute low-level "call" or "delegatecall"
   * @param parameters structured call parameters (target, data, value, delegate)
   * @param nonces array of nonces associated with each signature
   * @param signatures array of signatures
   */
  function _executeCall (
    Parameters memory parameters,
    uint[] calldata nonces,
    bytes[] calldata signatures
  ) internal returns (bytes memory) {
    _verifySignatures(parameters, nonces, signatures);

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
   * @param nonces array of nonces associated with each signature
   * @param signatures array of signatures
   */
  function _verifySignatures (
    Parameters memory parameters,
    uint[] calldata nonces,
    bytes[] calldata signatures
  ) virtual internal {
    require(
      nonces.length == signatures.length,
      'ECDSAMultisigWallet: signature and nonce array lengths do not match'
    );

    ECDSAMultisigWalletStorage.Layout storage l = ECDSAMultisigWalletStorage.layout();

    require(
      signatures.length >= l.quorum,
      'ECDSAMultisigWallet: quorum not reached'
    );

    address[] memory signers = new address[](signatures.length);

    for (uint i; i < nonces.length; i++) {
      uint nonce = nonces[i];

      address signer = keccak256(
        abi.encodePacked(
          parameters.target,
          parameters.value,
          parameters.data,
          parameters.delegate,
          nonce,
          address(this)
        )
      ).toEthSignedMessageHash().recover(signatures[i]);

      require(
        l.isSigner(signer),
        'ECDSAMultisigWallet: recovered signer is not authorized'
      );

      require(
        !l.isInvalidNonce(signer, nonce),
        'ECDSAMultisigWallet: invalid nonce'
      );

      l.setInvalidNonce(signer, nonce);

      for (uint j; j < i; j++) {
        require(
          signer != signers[j],
          'ECDSAMultisigWallet: duplicate signer found'
        );
      }

      signers[i] = signer;
    }
  }
}
