// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './ECDSAMultisigWallet.sol';

contract ECDSAMultisigWalletMock is ECDSAMultisigWallet {
  using ECDSAMultisigWalletStorage for ECDSAMultisigWalletStorage.Layout;

  constructor (
    uint quorum
  ) {
    ECDSAMultisigWalletStorage.Layout storage l = ECDSAMultisigWalletStorage.layout();
    l.setQuorum(quorum);
    l.addSigner(msg.sender);
  }
}
