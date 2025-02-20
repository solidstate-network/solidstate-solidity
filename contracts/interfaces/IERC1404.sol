// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20 } from './IERC20.sol';
import { IERC1404Internal } from './IERC1404Internal.sol';

/**
 * @title ERC1404 interface
 * @dev see https://eips.ethereum.org/EIPS/eip-1404
 */
interface IERC1404 is IERC1404Internal, IERC20 {
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
    function messageForTransferRestriction(
        uint8 restrictionCode
    ) external view returns (string memory);
}
