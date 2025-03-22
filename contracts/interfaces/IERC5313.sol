// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC5313 } from './_IERC5313.sol';

/**
 * @title Minimal contract ownership standard interface
 * @dev see https://eips.ethereum.org/EIPS/eip-5313
 */
interface IERC5313 is _IERC5313 {
    /**
     * @notice query the ERC173/ERC5313 contract owner
     * @return owner contract owner
     */
    function owner() external view returns (address owner);
}
