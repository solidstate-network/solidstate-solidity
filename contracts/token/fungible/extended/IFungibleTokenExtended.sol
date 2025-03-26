// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IFungibleTokenExtended } from './_IFungibleTokenExtended.sol';

/**
 * @title FungibleToken extended interface
 */
interface IFungibleTokenExtended is _IFungibleTokenExtended {
    /**
     * @notice increase spend amount granted to spender
     * @param spender address whose allowance to increase
     * @param amount quantity by which to increase allowance
     * @return success status (always true; otherwise function will revert)
     */
    function increaseAllowance(
        address spender,
        uint256 amount
    ) external returns (bool);

    /**
     * @notice decrease spend amount granted to spender
     * @param spender address whose allowance to decrease
     * @param amount quantity by which to decrease allowance
     * @return success status (always true; otherwise function will revert)
     */
    function decreaseAllowance(
        address spender,
        uint256 amount
    ) external returns (bool);
}
