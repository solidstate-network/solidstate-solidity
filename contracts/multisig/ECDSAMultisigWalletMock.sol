// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ECDSAMultisigWallet } from './ECDSAMultisigWallet.sol';
import { ECDSAMultisigWalletStorage } from './ECDSAMultisigWalletStorage.sol';

contract ECDSAMultisigWalletMock is ECDSAMultisigWallet {
    using ECDSAMultisigWalletStorage for ECDSAMultisigWalletStorage.Layout;

    constructor(address[] memory signers, uint256 quorum) {
        ECDSAMultisigWalletStorage.Layout storage l = ECDSAMultisigWalletStorage
            .layout();

        for (uint256 i; i < signers.length; i++) {
            l.addSigner(signers[i]);
        }

        l.setQuorum(quorum);
    }
}
