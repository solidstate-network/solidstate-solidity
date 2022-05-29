// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IECDSAMultisigWalletInternal {
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
