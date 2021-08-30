// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC20} from './IERC20.sol';
import {ERC20BaseInternal} from './ERC20BaseInternal.sol';
import {ERC20BaseStorage} from './ERC20BaseStorage.sol';

/**
 * @title Base ERC20 implementation, excluding optional extensions
 */
abstract contract ERC20Base is IERC20, ERC20BaseInternal {
  /**
   * @inheritdoc IERC20
   */
  function totalSupply () override virtual public view returns (uint) {
    return ERC20BaseStorage.layout().totalSupply;
  }

  /**
   * @inheritdoc IERC20
   */
  function balanceOf (
    address account
  ) override virtual public view returns (uint) {
    return ERC20BaseStorage.layout().balances[account];
  }

  /**
   * @inheritdoc IERC20
   */
  function allowance (
    address holder,
    address spender
  ) override virtual public view returns (uint) {
    return ERC20BaseStorage.layout().allowances[holder][spender];
  }

  /**
   * @inheritdoc IERC20
   */
  function approve (
    address spender,
    uint amount
  ) override virtual public returns (bool) {
    _approve(msg.sender, spender, amount);
    return true;
  }

  /**
   * @inheritdoc IERC20
   */
  function transfer (
    address recipient,
    uint amount
  ) override virtual public returns (bool) {
    _transfer(msg.sender, recipient, amount);
    return true;
  }

  /**
   * @inheritdoc IERC20
   */
  function transferFrom (
    address holder,
    address recipient,
    uint amount
  ) override virtual public returns (bool) {
    uint256 currentAllowance = ERC20BaseStorage.layout().allowances[holder][msg.sender];
    require(currentAllowance >= amount, 'ERC20: transfer amount exceeds allowance');
    unchecked {
      _approve(holder, msg.sender, currentAllowance - amount);
    }
    _transfer(holder, recipient, amount);
    return true;
  }
}
