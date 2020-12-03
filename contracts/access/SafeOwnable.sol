// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './Ownable.sol';
import './LibSafeOwnable.sol';
import './SafeOwnableStorage.sol';

contract SafeOwnable is Ownable, SafeOwnableStorage {
  function nomineeOwner () virtual public view returns (address) {
    return LibSafeOwnable.layout().nomineeOwner;
  }

  function transferOwnership (
    address account
  ) virtual override public onlyOwner {
    LibSafeOwnable.layout().nomineeOwner = account;
  }

  function acceptOwnership () virtual public onlyNomineeOwner {
    emit OwnershipTransferred(owner(), msg.sender);
    LibOwnable.layout().owner = msg.sender;
    LibSafeOwnable.layout().nomineeOwner = address(0);
  }
}
