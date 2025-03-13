// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { FungibleTokenBase } from '../base/FungibleTokenBase.sol';
import { _FungibleTokenBase } from '../base/_FungibleTokenBase.sol';
import { IFungibleTokenImplicitApproval } from './IFungibleTokenImplicitApproval.sol';
import { _FungibleTokenImplicitApproval } from './_FungibleTokenImplicitApproval.sol';

/**
 * @title FungibleToken token with approval whitelist
 */
abstract contract FungibleTokenImplicitApproval is
    IFungibleTokenImplicitApproval,
    _FungibleTokenImplicitApproval,
    FungibleTokenBase
{
    function _allowance(
        address holder,
        address spender
    )
        internal
        view
        virtual
        override(_FungibleTokenBase, _FungibleTokenImplicitApproval)
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
        override(_FungibleTokenBase, _FungibleTokenImplicitApproval)
        returns (bool)
    {
        return super._transferFrom(holder, recipient, amount);
    }
}
