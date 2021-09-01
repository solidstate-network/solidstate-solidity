// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC20Base} from '../base/ERC20Base.sol';
import {ERC20ImplicitApprovalInternal, ERC20ImplicitApprovalStorage} from './ERC20ImplicitApprovalInternal.sol';

/**
 * @title ERC20 token with approval whitelist
 */
abstract contract ERC20ImplicitApproval is ERC20ImplicitApprovalInternal, ERC20Base {
  /**
   * @inheritdoc ERC20Base
   * @dev internally stored allowance is ignored for implicitly approved spenders
   */
  function allowance (
    address holder,
    address spender
  ) override public view returns (uint) {
    if (_isImplicitlyApproved(spender)) {
      return type(uint).max;
    } else {
      return super.allowance(holder, spender);
    }
  }

  /**
   * @inheritdoc ERC20Base
   * @dev internally stored allowance is ignored for implicitly approved spenders
   */
  function transferFrom (
    address holder,
    address recipient,
    uint amount
  ) override public returns (bool) {
    if (_isImplicitlyApproved(msg.sender)) {
      _transfer(holder, recipient, amount);
      return true;
    } else {
      return super.transferFrom(holder, recipient, amount);
    }
  }
}
