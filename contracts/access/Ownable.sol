// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './IERC173.sol';
import './OwnableInternal.sol';
import './OwnableStorage.sol';

contract Ownable is IERC173, OwnableInternal {
  using OwnableStorage for OwnableStorage.Layout;

  function owner () virtual override public view returns (address) {
    return OwnableStorage.layout().owner;
  }

  function transferOwnership (
    address account
  ) virtual override public onlyOwner {
    OwnableStorage.layout().setOwner(account);
    emit OwnershipTransferred(msg.sender, account);
  }
}
