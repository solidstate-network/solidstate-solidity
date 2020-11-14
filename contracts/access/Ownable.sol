// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './IERC173.sol';
import './LibOwnable.sol';

contract Ownable is IERC173 {
  function owner () override external view returns (address) {
    return LibOwnable.getOwner();
  }

  function transferOwnership (address account) virtual override external {
    LibOwnable.requireOwner();
    LibOwnable.setOwner(account);
    emit OwnershipTransferred(msg.sender, account);
  }
}
