// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IFungibleTokenExtended } from './IFungibleTokenExtended.sol';
import { _FungibleTokenExtended } from './_FungibleTokenExtended.sol';

/**
 * @title FungibleToken safe approval extensions
 * @dev mitigations for transaction-ordering vulnerability (see https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)
 */
abstract contract FungibleTokenExtended is
    IFungibleTokenExtended,
    _FungibleTokenExtended
{
    /**
     * @inheritdoc IFungibleTokenExtended
     */
    function increaseAllowance(
        address spender,
        uint256 amount
    ) external returns (bool) {
        return _increaseAllowance(spender, amount);
    }

    /**
     * @inheritdoc IFungibleTokenExtended
     */
    function decreaseAllowance(
        address spender,
        uint256 amount
    ) external returns (bool) {
        return _decreaseAllowance(spender, amount);
    }
}
