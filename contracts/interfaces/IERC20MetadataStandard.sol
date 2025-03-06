// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC20MetadataStandard } from './_IERC20MetadataStandard.sol';

// TODO: improve name

interface IERC20MetadataStandard is _IERC20MetadataStandard {
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
