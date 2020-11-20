// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './IERC173.sol';
import './LibOwnable.sol';

abstract contract Ownable is IERC173 {
  modifier onlyOwner {
    require(msg.sender == owner(), 'Ownable: sender must be owner');
    _;
  }

  function owner () override public view returns (address) {
    return LibOwnable.layout().owner;
  }

  function transferOwnership (address account) virtual override external onlyOwner {
    LibOwnable.layout().owner = account;
    emit OwnershipTransferred(msg.sender, account);
  }
}
