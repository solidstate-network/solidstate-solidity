// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Ownable, OwnableStorage} from './Ownable.sol';
import {SafeOwnableInternal} from './SafeOwnableInternal.sol';
import {SafeOwnableStorage} from './SafeOwnableStorage.sol';

contract SafeOwnable is Ownable, SafeOwnableInternal {
  using OwnableStorage for OwnableStorage.Layout;
  using SafeOwnableStorage for SafeOwnableStorage.Layout;

  function nomineeOwner () virtual public view returns (address) {
    return SafeOwnableStorage.layout().nomineeOwner;
  }

  function transferOwnership (
    address account
  ) virtual override public onlyOwner {
    SafeOwnableStorage.layout().setNomineeOwner(account);
  }

  function acceptOwnership () virtual public onlyNomineeOwner {
    OwnableStorage.Layout storage l = OwnableStorage.layout();
    emit OwnershipTransferred(l.owner, msg.sender);
    l.setOwner(msg.sender);
    SafeOwnableStorage.layout().setNomineeOwner(address(0));
  }
}
