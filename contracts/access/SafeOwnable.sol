// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './Ownable.sol';
import './LibSafeOwnable.sol';
import './SafeOwnableStorage.sol';

contract SafeOwnable is Ownable, SafeOwnableStorage {
  using LibOwnable for LibOwnable.Layout;
  using LibSafeOwnable for LibSafeOwnable.Layout;

  function nomineeOwner () virtual public view returns (address) {
    return LibSafeOwnable.layout().nomineeOwner;
  }

  function transferOwnership (
    address account
  ) virtual override public onlyOwner {
    LibSafeOwnable.layout().setNomineeOwner(account);
  }

  function acceptOwnership () virtual public onlyNomineeOwner {
    LibOwnable.Layout storage l = LibOwnable.layout();
    emit OwnershipTransferred(l.owner, msg.sender);
    l.setOwner(msg.sender);
    LibSafeOwnable.layout().setNomineeOwner(address(0));
  }
}
