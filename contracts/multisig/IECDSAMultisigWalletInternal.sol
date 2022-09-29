// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

interface IECDSAMultisigWalletInternal {
    error ECDSAMultisigWalletInternal__AmountMismatch();
    error ECDSAMultisigWalletInternal__InvalidNonce();
    error ECDSAMultisigWalletInternal__QuorumNotReached();
    error ECDSAMultisigWalletInternal__RecoveredSignerNotAuthorized();
    error ECDSAMultisigWalletInternal__SignerAlreadySigned();

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
