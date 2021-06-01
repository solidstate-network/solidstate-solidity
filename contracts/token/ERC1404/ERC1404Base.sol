// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC1404} from './IERC1404.sol';
import {ERC1404Storage} from './ERC1404Storage.sol';
import {ERC20Base} from '../ERC20/ERC20Base.sol';

abstract contract ERC1404Base is IERC1404, ERC20Base {
  using ERC1404Storage for ERC1404Storage.Layout;

  function detectTransferRestriction (
    address from,
    address to,
    uint amount
  ) virtual override public view returns (uint8);

  function messageForTransferRestriction (
    uint8 restrictionCode
  ) virtual override public view returns (string memory) {
    return ERC1404Storage.layout().getRestrictionMessage(restrictionCode);
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
