// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC20Base.sol';

contract ERC20BaseMock is ERC20Base {
  function transfer (address sender, address recipient, uint amount) external {
    _transfer(sender, recipient, amount);
  }

  function mint (address account, uint amount) external {
    _mint(account, amount);
  }

  function burn (address account, uint amount) external {
    _burn(account, amount);
  }

  function approve (address holder, address spender, uint amount) external {
    _approve(holder, spender, amount);
  }
}
