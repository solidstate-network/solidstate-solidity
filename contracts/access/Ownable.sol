// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './IERC173.sol';
import './LibOwnable.sol';
import './OwnableStorage.sol';

contract Ownable is IERC173, OwnableStorage {
  function owner () virtual override public view returns (address) {
    return LibOwnable.layout().owner;
  }

  function transferOwnership (
    address account
  ) virtual override public onlyOwner {
    LibOwnable.layout().owner = account;
    emit OwnershipTransferred(msg.sender, account);
  }
}
