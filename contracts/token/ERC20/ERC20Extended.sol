// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC20Base, ERC20BaseStorage} from './ERC20Base.sol';

abstract contract ERC20Extended is ERC20Base {
  function increaseAllowance (address spender, uint amount) virtual public returns (bool) {
    unchecked {
      mapping (address => uint) storage allowances = ERC20BaseStorage.layout().allowances[msg.sender];

      uint allowance = allowances[spender];
      require(allowance + amount >= allowance, 'ERC20Extended: excessive allowance');

      _approve(
        msg.sender,
        spender,
        allowances[spender] = allowance + amount
      );

      return true;
    }
  }

  function decreaseAllowance (address spender, uint amount) virtual public returns (bool) {
    unchecked {
      mapping (address => uint) storage allowances = ERC20BaseStorage.layout().allowances[msg.sender];

      uint allowance = allowances[spender];
      require(amount <= allowance, 'ERC20Extended: insufficient allowance');

      _approve(
        msg.sender,
        spender,
        allowances[spender] = allowance - amount
      );

      return true;
    }
  }
}
