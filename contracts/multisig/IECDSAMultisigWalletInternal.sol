// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

interface IECDSAMultisigWalletInternal {
    error ECDSAMultisigWallet__AmountMismatch();
    error ECDSAMultisigWallet__InvalidNonce();
    error ECDSAMultisigWallet__QuorumNotReached();
    error ECDSAMultisigWallet__RecoveredSignerNotAuthorized();
    error ECDSAMultisigWallet__SignerAlreadySigned();

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
