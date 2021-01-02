// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './LibSafeOwnable.sol';

abstract contract SafeOwnableStorage {
  using LibSafeOwnable for LibSafeOwnable.Layout;

  modifier onlyNomineeOwner () {
    require(
      msg.sender == LibSafeOwnable.layout().nomineeOwner,
      'SafeOwnable: sender must be nominee owner'
    );
    _;
  }
}
