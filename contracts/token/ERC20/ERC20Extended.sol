// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ERC20Base.sol';

abstract contract ERC20Extended is ERC20Base {
  function increaseAllowance (address spender, uint amount) virtual public returns (bool) {
    _approve(
      msg.sender,
      spender,
      // TODO: error message
      // ERC20BaseStorage.layout().allowances[msg.sender][spender].add(amount)
      ERC20BaseStorage.layout().allowances[msg.sender][spender] - amount
    );
    return true;
  }

  function decreaseAllowance (address spender, uint amount) virtual public returns (bool) {
    _approve(
      msg.sender,
      spender,
      // TODO: error message
      // ERC20BaseStorage.layout().allowances[msg.sender][spender].sub(amount)
      ERC20BaseStorage.layout().allowances[msg.sender][spender] - amount
    );
    return true;
  }
}
