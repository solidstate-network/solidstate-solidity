// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC20 } from '../ERC20/IERC20.sol';

/**
 * @title ERC1404 interface
 * @dev see https://github.com/ethereum/EIPs/issues/1404
 */
interface IERC1404 is IERC20 {
    /**
     * @notice return restriction code resulting from given transaction parameters
     * @return restriction code (0 if no restriction exists)
     */
    function detectTransferRestriction(
        address from,
        address to,
        uint256 amount
    ) external view returns (uint8);

    /**
     * @notice return the appropriate error message for given restriction code
     * @return error message
     */
    function messageForTransferRestriction(uint8 restrictionCode)
        external
        view
        returns (string memory);
}
