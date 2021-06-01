// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC1404Base} from './ERC1404Base.sol';
import {ERC20, ERC20Base} from '../ERC20/ERC20.sol';

abstract contract ERC1404 is ERC1404Base, ERC20 {
  function _beforeTokenTransfer (
    address from,
    address to,
    uint amount
  ) virtual override(ERC1404Base, ERC20Base) internal {
    super._beforeTokenTransfer(from, to, amount);
  }
}
