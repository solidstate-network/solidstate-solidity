// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ERC20Storage } from '../../storage/ERC20Storage.sol';
import { _Context } from '../../meta/_Context.sol';
import { _IFungibleToken } from './_IFungibleToken.sol';

/**
 * @title Base FungibleToken internal functions, excluding optional extensions
 */
abstract contract _FungibleToken is _IFungibleToken, _Context {
    /**
     * @notice query the total minted token supply
     * @return token supply
     */
    function _totalSupply() internal view virtual returns (uint256) {
        return
            ERC20Storage.layout(ERC20Storage.DEFAULT_STORAGE_SLOT).totalSupply;
    }

    /**
     * @notice query the token balance of given account
     * @param account address to query
     * @return token balance
     */
    function _balanceOf(
        address account
    ) internal view virtual returns (uint256) {
        return
            ERC20Storage.layout(ERC20Storage.DEFAULT_STORAGE_SLOT).balances[
                account
            ];
    }

    /**
     * @notice query the allowance granted from given holder to given spender
     * @param holder approver of allowance
     * @param spender recipient of allowance
     * @return token allowance
     */
    function _allowance(
        address holder,
        address spender
    ) internal view virtual returns (uint256) {
        return
            ERC20Storage.layout(ERC20Storage.DEFAULT_STORAGE_SLOT).allowances[
                holder
            ][spender];
    }

    function _approve(address spender, uint256 amount) internal returns (bool) {
        return _approve(_msgSender(), spender, amount);
    }

    /**
     * @notice enable spender to spend tokens on behalf of holder
     * @param holder address on whose behalf tokens may be spent
     * @param spender recipient of allowance
     * @param amount quantity of tokens approved for spending
     * @return success status (always true; otherwise function should revert)
     */
    function _approve(
        address holder,
        address spender,
        uint256 amount
    ) internal virtual returns (bool) {
        if (holder == address(0))
            revert FungibleToken__ApproveFromZeroAddress();
        if (spender == address(0)) revert FungibleToken__ApproveToZeroAddress();

        ERC20Storage.layout(ERC20Storage.DEFAULT_STORAGE_SLOT).allowances[
            holder
        ][spender] = amount;

        emit Approval(holder, spender, amount);

        return true;
    }

    /**
     * @notice decrease spend amount granted by holder to spender
     * @param holder address on whose behalf tokens may be spent
     * @param spender address whose allowance to decrease
     * @param amount quantity by which to decrease allowance
     */
    function _decreaseAllowance(
        address holder,
        address spender,
        uint256 amount
    ) internal {
        uint256 allowance = _allowance(holder, spender);

        if (amount > allowance) revert FungibleToken__InsufficientAllowance();

        unchecked {
            _approve(holder, spender, allowance - amount);
        }
    }

    /**
     * @notice mint tokens for given account
     * @param account recipient of minted tokens
     * @param amount quantity of tokens minted
     */
    function _mint(address account, uint256 amount) internal virtual {
        if (account == address(0)) revert FungibleToken__MintToZeroAddress();

        _beforeTokenTransfer(address(0), account, amount);

        ERC20Storage.Layout storage $ = ERC20Storage.layout(
            ERC20Storage.DEFAULT_STORAGE_SLOT
        );
        $.totalSupply += amount;
        $.balances[account] += amount;

        emit Transfer(address(0), account, amount);
    }

    /**
     * @notice burn tokens held by given account
     * @param account holder of burned tokens
     * @param amount quantity of tokens burned
     */
    function _burn(address account, uint256 amount) internal virtual {
        if (account == address(0)) revert FungibleToken__BurnFromZeroAddress();

        _beforeTokenTransfer(account, address(0), amount);

        ERC20Storage.Layout storage $ = ERC20Storage.layout(
            ERC20Storage.DEFAULT_STORAGE_SLOT
        );
        uint256 balance = $.balances[account];
        if (amount > balance) revert FungibleToken__BurnExceedsBalance();
        unchecked {
            $.balances[account] = balance - amount;
        }
        $.totalSupply -= amount;

        emit Transfer(account, address(0), amount);
    }

    function _transfer(
        address recipient,
        uint256 amount
    ) internal returns (bool) {
        return _transfer(_msgSender(), recipient, amount);
    }

    /**
     * @notice transfer tokens from holder to recipient
     * @param holder owner of tokens to be transferred
     * @param recipient beneficiary of transfer
     * @param amount quantity of tokens transferred
     * @return success status (always true; otherwise function should revert)
     */
    function _transfer(
        address holder,
        address recipient,
        uint256 amount
    ) internal virtual returns (bool) {
        if (holder == address(0))
            revert FungibleToken__TransferFromZeroAddress();
        if (recipient == address(0))
            revert FungibleToken__TransferToZeroAddress();

        _beforeTokenTransfer(holder, recipient, amount);

        ERC20Storage.Layout storage $ = ERC20Storage.layout(
            ERC20Storage.DEFAULT_STORAGE_SLOT
        );
        uint256 holderBalance = $.balances[holder];
        if (amount > holderBalance)
            revert FungibleToken__TransferExceedsBalance();
        unchecked {
            $.balances[holder] = holderBalance - amount;
        }
        $.balances[recipient] += amount;

        emit Transfer(holder, recipient, amount);

        return true;
    }

    /**
     * @notice transfer tokens to given recipient on behalf of given holder
     * @param holder holder of tokens prior to transfer
     * @param recipient beneficiary of token transfer
     * @param amount quantity of tokens to transfer
     * @return success status (always true; otherwise function should revert)
     */
    function _transferFrom(
        address holder,
        address recipient,
        uint256 amount
    ) internal virtual returns (bool) {
        _decreaseAllowance(holder, _msgSender(), amount);

        _transfer(holder, recipient, amount);

        return true;
    }

    /**
     * @notice ERC20 hook, called before all transfers including mint and burn
     * @dev function should be overridden and new implementation must call super
     * @param from sender of tokens
     * @param to receiver of tokens
     * @param amount quantity of tokens transferred
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}
