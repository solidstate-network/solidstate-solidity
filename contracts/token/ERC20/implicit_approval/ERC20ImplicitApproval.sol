// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20Base } from '../base/ERC20Base.sol';
import { ERC20BaseInternal } from '../base/ERC20BaseInternal.sol';
import { IERC20ImplicitApproval } from './IERC20ImplicitApproval.sol';
import { ERC20ImplicitApprovalInternal } from './ERC20ImplicitApprovalInternal.sol';

/**
 * @title ERC20 token with approval whitelist
 */
abstract contract ERC20ImplicitApproval is
    IERC20ImplicitApproval,
    ERC20Base,
    ERC20ImplicitApprovalInternal
{
    function _allowance(
        address holder,
        address spender
    )
        internal
        view
        virtual
        override(ERC20BaseInternal, ERC20ImplicitApprovalInternal)
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
        override(ERC20BaseInternal, ERC20ImplicitApprovalInternal)
        returns (bool)
    {
        return super._transferFrom(holder, recipient, amount);
    }
}
