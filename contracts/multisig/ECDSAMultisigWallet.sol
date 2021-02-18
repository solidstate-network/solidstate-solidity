// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import '../cryptography/ECDSA.sol';
import '../utils/EnumerableSet.sol';
import './ECDSAMultisigWalletStorage.sol';

/**
 * @title ECDSA-verified multisig wallet contract
 * @dev inheriting contract should provide functions to read and write nonce invalidation status
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

  receive () virtual external payable {}

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

    uint signerBitmap;

    for (uint i; i < signatures.length; i++) {
      Signature memory signature = signatures[i];

      address signer = keccak256(
        abi.encodePacked(
          parameters.target,
          parameters.data,
          parameters.value,
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

      uint signerBit = 2 ** l.indexOfSigner(signer);

      require(
        signerBitmap & signerBit == 0,
        'ECDSAMultisigWallet: signer can not sign more than once'
      );

      signerBitmap = signerBitmap + signerBit;
    }
  }
}
