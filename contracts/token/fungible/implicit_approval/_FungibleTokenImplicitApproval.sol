// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _FungibleToken } from '../_FungibleToken.sol';
import { _IFungibleTokenImplicitApproval } from './_IFungibleTokenImplicitApproval.sol';
import { ERC20Storage } from '../../../storage/ERC20Storage.sol';

/**
 * @title FungibleTokenImplicitApproval internal functions
 */
abstract contract _FungibleTokenImplicitApproval is
    _IFungibleTokenImplicitApproval,
    _FungibleToken
{
    /**
     * @inheritdoc _FungibleToken
     * @dev internally stored allowance is ignored for implicitly approved spenders
     */
    function _allowance(
        address holder,
        address spender
    ) internal view virtual override returns (uint256) {
        if (_isImplicitlyApproved(spender)) {
            return type(uint256).max;
        } else {
            return super._allowance(holder, spender);
        }
    }

    /**
     * @inheritdoc _FungibleToken
     * @dev internally stored allowance is ignored for implicitly approved spenders
     */
    function _transferFrom(
        address holder,
        address recipient,
        uint256 amount
    ) internal virtual override returns (bool) {
        if (_isImplicitlyApproved(msg.sender)) {
            _transfer(holder, recipient, amount);
            return true;
        } else {
            return super._transferFrom(holder, recipient, amount);
        }
    }

    /**
     * @notice get whether address is implicitly approved to spend tokens
     * @param account address to query
     * @return implicit approval status
     */
    function _isImplicitlyApproved(
        address account
    ) internal view virtual returns (bool) {
        return
            ERC20Storage
                .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
                .implicitApprovals[account];
    }

    /**
     * @notice set whether address is implicitly approved to spend tokens
     * @param account address whose status to set
     * @param status approval status
     */
    function _setImplicitlyApproved(
        address account,
        bool status
    ) internal virtual {
        ERC20Storage
            .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
            .implicitApprovals[account] = status;
    }
}
