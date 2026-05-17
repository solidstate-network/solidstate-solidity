// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC20Metadata } from './_IERC20Metadata.sol';

interface IERC20Metadata is _IERC20Metadata {
    /**
     * @notice return token name
     * @return token name
     */
    function name() external view returns (string memory);

    /**
     * @notice return token symbol
     * @return token symbol
     */
    function symbol() external view returns (string memory);

    /**
     * @notice return token decimals, generally used only for display purposes
     * @return token decimals
     */
    function decimals() external view returns (uint8);
}
