// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './IERC1404.sol';
import './LibERC1404.sol';
import '../ERC20/ERC20Base.sol';

abstract contract ERC1404Base is IERC1404, ERC20Base {
  function detectTransferRestriction (
    address from,
    address to,
    uint amount
  ) virtual override public view returns (uint8);

  function messageForTransferRestriction (
    uint8 restrictionCode
  ) virtual override public view returns (string memory) {
    return LibERC1404.layout().restrictions[restrictionCode];
  }

  function _beforeTokenTransfer (
    address from,
    address to,
    uint amount
  ) virtual override internal {
    super._beforeTokenTransfer(from, to, amount);

    uint8 restrictionCode = detectTransferRestriction(from, to, amount);

    if (restrictionCode > 0) {
      revert(messageForTransferRestriction(restrictionCode));
    }
  }
}
