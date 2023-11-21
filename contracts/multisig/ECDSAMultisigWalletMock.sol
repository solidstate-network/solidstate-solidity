// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import { ECDSAMultisigWallet } from './ECDSAMultisigWallet.sol';

contract ECDSAMultisigWalletMock is ECDSAMultisigWallet {
    constructor(address[] memory signers, uint256 quorum) {
        for (uint256 i; i < signers.length; i++) {
            _addSigner(signers[i]);
        }

        _setQuorum(quorum);
    }
}
