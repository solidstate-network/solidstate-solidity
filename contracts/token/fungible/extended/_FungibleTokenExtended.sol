// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _FungibleToken } from '../_FungibleToken.sol';
import { _IFungibleTokenExtended } from './_IFungibleTokenExtended.sol';

/**
 * @title FungibleToken safe approval extensions
 * @dev mitigations for transaction-ordering vulnerability (see https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)
 */
abstract contract _FungibleTokenExtended is
    _IFungibleTokenExtended,
    _FungibleToken
{
    /**
     * @notice increase spend amount granted to spender
     * @param spender address whose allowance to increase
     * @param amount quantity by which to increase allowance
     * @return success status (always true; otherwise function will revert)
     */
    function _increaseAllowance(
        address spender,
        uint256 amount
    ) internal virtual returns (bool) {
        uint256 allowance = _allowance(_msgSender(), spender);

        unchecked {
            if (allowance > allowance + amount)
                revert FungibleTokenExtended__ExcessiveAllowance();

            return _approve(_msgSender(), spender, allowance + amount);
        }
    }

    /**
     * @notice decrease spend amount granted to spender
     * @param spender address whose allowance to decrease
     * @param amount quantity by which to decrease allowance
     * @return success status (always true; otherwise function will revert)
     */
    function _decreaseAllowance(
        address spender,
        uint256 amount
    ) internal virtual returns (bool) {
        _decreaseAllowance(_msgSender(), spender, amount);

        return true;
    }
}
