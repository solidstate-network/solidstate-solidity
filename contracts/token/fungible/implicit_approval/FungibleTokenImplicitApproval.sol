// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { FungibleToken } from '../FungibleToken.sol';
import { _FungibleToken } from '../_FungibleToken.sol';
import { IFungibleTokenImplicitApproval } from './IFungibleTokenImplicitApproval.sol';
import { _FungibleTokenImplicitApproval } from './_FungibleTokenImplicitApproval.sol';

/**
 * @title FungibleToken token with approval whitelist
 */
abstract contract FungibleTokenImplicitApproval is
    IFungibleTokenImplicitApproval,
    _FungibleTokenImplicitApproval,
    FungibleToken
{
    function _allowance(
        address holder,
        address spender
    )
        internal
        view
        virtual
        override(_FungibleToken, _FungibleTokenImplicitApproval)
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
        override(_FungibleToken, _FungibleTokenImplicitApproval)
        returns (bool)
    {
        return super._transferFrom(holder, recipient, amount);
    }
}
