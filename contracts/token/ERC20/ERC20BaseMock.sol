// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC20Base} from './ERC20Base.sol';

contract ERC20BaseMock is ERC20Base {
  function __transfer (address sender, address recipient, uint amount) external {
    _transfer(sender, recipient, amount);
  }

  function __mint (address account, uint amount) external {
    _mint(account, amount);
  }

  function __burn (address account, uint amount) external {
    _burn(account, amount);
  }

  function __approve (address holder, address spender, uint amount) external {
    _approve(holder, spender, amount);
  }
}
