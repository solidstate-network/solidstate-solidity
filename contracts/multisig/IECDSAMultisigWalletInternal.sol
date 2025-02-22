// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IECDSAMultisigWalletInternal {
    error ECDSAMultisigWallet__MessageValueMismatch();
    error ECDSAMultisigWallet__InvalidNonce();
    error ECDSAMultisigWallet__QuorumNotReached();
    error ECDSAMultisigWallet__RecoveredSignerNotAuthorized();
    error ECDSAMultisigWallet__SignerAlreadySigned();
    error ECDSAMultisigWallet__AddSignerFailed();
    error ECDSAMultisigWallet__InsufficientSigners();
    error ECDSAMultisigWallet__RemoveSignerFailed();
    error ECDSAMultisigWallet__SignerLimitReached();

    struct Parameters {
        address payable target;
        bytes data;
        uint256 value;
        bool delegate;
    }

    struct Signature {
        bytes data;
        uint256 nonce;
    }
}
