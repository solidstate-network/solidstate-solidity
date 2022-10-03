// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ECDSA } from '../cryptography/ECDSA.sol';
import { EnumerableSet } from '../utils/EnumerableSet.sol';
import { IECDSAMultisigWalletInternal } from './IECDSAMultisigWalletInternal.sol';
import { ECDSAMultisigWalletStorage } from './ECDSAMultisigWalletStorage.sol';

/**
 * @title ECDSA-verified multisig wallet contract
 * @dev inheriting contract should provide functions to read and write nonce invalidation status
 */
abstract contract ECDSAMultisigWalletInternal is IECDSAMultisigWalletInternal {
    using ECDSA for bytes32;
    using EnumerableSet for EnumerableSet.AddressSet;
    using ECDSAMultisigWalletStorage for ECDSAMultisigWalletStorage.Layout;

    /**
     * @notice verify signatures and execute "call" or "delegatecall" with given parameters
     * @dev message parameters must be included in signature
     * @param parameters structured call parameters (target, data, value, delegate)
     * @param signatures array of structured signature data (signature, nonce)
     */
    function _verifyAndExecute(
        Parameters memory parameters,
        Signature[] memory signatures
    ) internal returns (bytes memory) {
        _verifySignatures(
            abi.encodePacked(
                parameters.target,
                parameters.data,
                parameters.value,
                parameters.delegate
            ),
            signatures
        );

        return _executeCall(parameters);
    }

    /**
     * @notice execute low-level "call" or "delegatecall"
     * @param parameters structured call parameters (target, data, value, delegate)
     */
    function _executeCall(Parameters memory parameters)
        internal
        virtual
        returns (bytes memory)
    {
        bool success;
        bytes memory returndata;

        if (parameters.delegate) {
            if (parameters.value != msg.value)
                revert ECDSAMultisigWallet__MessageValueMismatch();
            (success, returndata) = parameters.target.delegatecall(
                parameters.data
            );
        } else {
            (success, returndata) = parameters.target.call{
                value: parameters.value
            }(parameters.data);
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
     * @param data packed data payload
     * @param signatures array of structured signature data (signature, nonce)
     */
    function _verifySignatures(bytes memory data, Signature[] memory signatures)
        internal
        virtual
    {
        ECDSAMultisigWalletStorage.Layout storage l = ECDSAMultisigWalletStorage
            .layout();

        if (l.quorum > signatures.length)
            revert ECDSAMultisigWallet__QuorumNotReached();

        uint256 signerBitmap;

        unchecked {
            for (uint256 i; i < signatures.length; i++) {
                Signature memory signature = signatures[i];

                address signer = keccak256(
                    abi.encodePacked(data, signature.nonce, address(this))
                ).toEthSignedMessageHash().recover(signature.data);

                uint256 index = l.signers.indexOf(signer);

                if (index >= 256)
                    revert ECDSAMultisigWallet__RecoveredSignerNotAuthorized();
                if (l.isInvalidNonce(signer, signature.nonce))
                    revert ECDSAMultisigWallet__InvalidNonce();

                l.setInvalidNonce(signer, signature.nonce);

                uint256 shift = 1 << index;

                if (signerBitmap & shift != 0)
                    revert ECDSAMultisigWallet__SignerAlreadySigned();

                signerBitmap |= shift;
            }
        }
    }
}
