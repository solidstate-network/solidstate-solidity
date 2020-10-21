// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './IERC173.sol';
import './OwnableStorage.sol';

contract Ownable is IERC173, OwnableStorage {
  function owner () override external view returns (address) {
    return _getOwner();
  }

  function transferOwnership (address account) virtual override external onlyOwner {
    _setOwner(account);
    emit OwnershipTransferred(msg.sender, account);
  }
}
