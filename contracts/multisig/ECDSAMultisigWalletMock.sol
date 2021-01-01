// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import '@openzeppelin/contracts/utils/EnumerableSet.sol';

import './ECDSAMultisigWallet.sol';

contract ECDSAMultisigWalletMock is ECDSAMultisigWallet {
  using EnumerableSet for EnumerableSet.AddressSet;

  constructor (
    uint quorum
  ) public {
    LibECDSAMultisigWallet.Layout storage l = LibECDSAMultisigWallet.layout();
    l.quorum = quorum;
    l.signers.add(msg.sender);
  }
}
