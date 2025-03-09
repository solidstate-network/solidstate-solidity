// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20Base } from '../base/ERC20Base.sol';
import { _ERC20Base } from '../base/_ERC20Base.sol';
import { IERC20ImplicitApproval } from './IERC20ImplicitApproval.sol';
import { _ERC20ImplicitApproval } from './_ERC20ImplicitApproval.sol';

/**
 * @title ERC20 token with approval whitelist
 */
abstract contract ERC20ImplicitApproval is
    IERC20ImplicitApproval,
    _ERC20ImplicitApproval,
    ERC20Base
{
    function _allowance(
        address holder,
        address spender
    )
        internal
        view
        virtual
        override(_ERC20Base, _ERC20ImplicitApproval)
        returns (uint256)
    {
        return super._allowance(holder, spender);
    }

    function _transferFrom(
        address holder,
        address recipient,
        uint256 amount
    )
        internal
        virtual
        override(_ERC20Base, _ERC20ImplicitApproval)
        returns (bool)
    {
        return super._transferFrom(holder, recipient, amount);
    }
}
