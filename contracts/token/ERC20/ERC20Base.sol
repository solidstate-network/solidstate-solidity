// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

import './IERC20.sol';
import './ERC20BaseStorage.sol';

abstract contract ERC20Base is IERC20 {
  using SafeMath for uint;

  function totalSupply () override virtual public view returns (uint) {
    return ERC20BaseStorage.layout().totalSupply;
  }

  function balanceOf (
    address account
  ) override virtual public view returns (uint) {
    return ERC20BaseStorage.layout().balances[account];
  }

  function allowance (
    address holder,
    address spender
  ) override virtual public view returns (uint) {
    return ERC20BaseStorage.layout().allowances[holder][spender];
  }

  function transfer (
    address recipient,
    uint amount
  ) override virtual public returns (bool) {
    _transfer(msg.sender, recipient, amount);
    return true;
  }

  function transferFrom (
    address sender,
    address recipient,
    uint amount
  ) override virtual public returns (bool) {
    _approve(sender, msg.sender, ERC20BaseStorage.layout().allowances[sender][msg.sender].sub(amount, 'ERC20: transfer amount exceeds allowance'));
    _transfer(sender, recipient, amount);
    return true;
  }

  function approve (
    address spender,
    uint amount
  ) override virtual public returns (bool) {
    _approve(msg.sender, spender, amount);
    return true;
  }

  function _mint (
    address account,
    uint amount
  ) virtual internal {
    require(account != address(0), 'ERC20: mint to the zero address');

    _beforeTokenTransfer(address(0), account, amount);

    ERC20BaseStorage.Layout storage l = ERC20BaseStorage.layout();
    l.totalSupply = l.totalSupply.add(amount);
    l.balances[account] = l.balances[account].add(amount);

    emit Transfer(address(0), account, amount);
  }

  function _burn (
    address account,
    uint amount
  ) virtual internal {
    require(account != address(0), 'ERC20: burn from the zero address');

    _beforeTokenTransfer(account, address(0), amount);

    ERC20BaseStorage.Layout storage l = ERC20BaseStorage.layout();
    l.balances[account] = l.balances[account].sub(amount);
    l.totalSupply = l.totalSupply.sub(amount);

    emit Transfer(account, address(0), amount);
  }

  function _transfer (
    address sender,
    address recipient,
    uint amount
  ) virtual internal {
    require(sender != address(0), 'ERC20: transfer from the zero address');
    require(recipient != address(0), 'ERC20: transfer to the zero address');

    _beforeTokenTransfer(sender, recipient, amount);

    ERC20BaseStorage.Layout storage l = ERC20BaseStorage.layout();
    l.balances[sender] = l.balances[sender].sub(amount, 'ERC20: transfer amount exceeds balance');
    l.balances[recipient] = l.balances[recipient].add(amount);

    emit Transfer(sender, recipient, amount);
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
