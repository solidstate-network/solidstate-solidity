// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './ECDSAMultisigWallet.sol';

contract ECDSAMultisigWalletMock is ECDSAMultisigWallet {
  using LibECDSAMultisigWallet for LibECDSAMultisigWallet.Layout;

  constructor (
    uint quorum
  ) {
    LibECDSAMultisigWallet.Layout storage l = LibECDSAMultisigWallet.layout();
    l.setQuorum(quorum);
    l.addSigner(msg.sender);
  }
}
