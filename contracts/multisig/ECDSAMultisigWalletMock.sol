// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import './ECDSAMultisigWallet.sol';

contract ECDSAMultisigWalletMock is ECDSAMultisigWallet {
  constructor (
    uint quorum
  ) public {
    LibECDSAMultisigWallet.Layout storage l = LibECDSAMultisigWallet.layout();
    l.quorum = quorum;
    l.signers[msg.sender] = true;
  }
}
