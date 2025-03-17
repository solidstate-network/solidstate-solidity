// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC173 } from './_IERC173.sol';
import { IERC5313 } from './IERC5313.sol';

/**
 * @title Contract ownership standard interface
 * @dev see https://eips.ethereum.org/EIPS/eip-173
 */
interface IERC173 is _IERC173, IERC5313 {
    /**
     * @inheritdoc IERC5313
     */
    function owner() external view returns (address owner);

    /**
     * @notice transfer contract ownership to new account
     * @param account address of new owner
     */
    function transferOwnership(address account) external;
}
