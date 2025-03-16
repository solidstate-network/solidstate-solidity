// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20 } from '../../../interfaces/IERC20.sol';
import { IFungibleTokenBase } from './IFungibleTokenBase.sol';
import { _FungibleTokenBase } from './_FungibleTokenBase.sol';
import { ERC20Storage } from '../../../storage/ERC20Storage.sol';

/**
 * @title Base FungibleToken implementation, excluding optional extensions
 */
abstract contract FungibleTokenBase is IFungibleTokenBase, _FungibleTokenBase {
    /**
     * @inheritdoc IERC20
     */
    function totalSupply() external view returns (uint256) {
        return _totalSupply();
    }

    /**
     * @inheritdoc IERC20
     */
    function balanceOf(address account) external view returns (uint256) {
        return _balanceOf(account);
    }

    /**
     * @inheritdoc IERC20
     */
    function allowance(
        address holder,
        address spender
    ) external view returns (uint256) {
        return _allowance(holder, spender);
    }

    /**
     * @inheritdoc IERC20
     */
    function approve(address spender, uint256 amount) external returns (bool) {
        return _approve(spender, amount);
    }

    /**
     * @inheritdoc IERC20
     */
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool) {
        return _transfer(recipient, amount);
    }

    /**
     * @inheritdoc IERC20
     */
    function transferFrom(
        address holder,
        address recipient,
        uint256 amount
    ) external returns (bool) {
        return _transferFrom(holder, recipient, amount);
    }
}
