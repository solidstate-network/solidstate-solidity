// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC20} from './IERC20.sol';
import {ERC20BaseStorage} from './ERC20BaseStorage.sol';

/**
 * @title Base ERC20 implementation, excluding optional extensions
 */
abstract contract ERC20Base is IERC20 {
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

  function _mint (
    address account,
    uint amount
  ) virtual internal {
    require(account != address(0), 'ERC20: mint to the zero address');

    _beforeTokenTransfer(address(0), account, amount);

    ERC20BaseStorage.Layout storage l = ERC20BaseStorage.layout();
    l.totalSupply += amount;
    l.balances[account] += amount;

    emit Transfer(address(0), account, amount);
  }

  function _burn (
    address account,
    uint amount
  ) virtual internal {
    require(account != address(0), 'ERC20: burn from the zero address');

    _beforeTokenTransfer(account, address(0), amount);

    ERC20BaseStorage.Layout storage l = ERC20BaseStorage.layout();
    uint256 balance = l.balances[account];
    require(balance >= amount, "ERC20: burn amount exceeds balance");
    unchecked {
      l.balances[account] = balance - amount;
    }
    l.totalSupply -= amount;

    emit Transfer(account, address(0), amount);
  }

  function _transfer (
    address holder,
    address recipient,
    uint amount
  ) virtual internal {
    require(holder != address(0), 'ERC20: transfer from the zero address');
    require(recipient != address(0), 'ERC20: transfer to the zero address');

    _beforeTokenTransfer(holder, recipient, amount);

    ERC20BaseStorage.Layout storage l = ERC20BaseStorage.layout();
    uint256 holderBalance = l.balances[holder];
    require(holderBalance >= amount, 'ERC20: transfer amount exceeds balance');
    unchecked {
      l.balances[holder] = holderBalance - amount;
    }
    l.balances[recipient] += amount;

    emit Transfer(holder, recipient, amount);
  }

  function _approve (
    address holder,
    address spender,
    uint amount
  ) virtual internal {
    require(holder != address(0), 'ERC20: approve from the zero address');
    require(spender != address(0), 'ERC20: approve to the zero address');

    ERC20BaseStorage.layout().allowances[holder][spender] = amount;

    emit Approval(holder, spender, amount);
  }

  function _beforeTokenTransfer (
    address from,
    address to,
    uint amount
  ) virtual internal {}
}
