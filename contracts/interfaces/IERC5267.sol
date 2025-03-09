// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC5267 } from './_IERC5267.sol';

/**
 * @title ERC5267 interface
 * @dev see https://eips.ethereum.org/EIPS/eip-5267.
 */
interface IERC5267 is _IERC5267 {
    function eip712Domain()
        external
        view
        returns (
            bytes1 fields,
            string calldata name,
            string calldata version,
            uint256 chainId,
            address verifyingContract,
            bytes32 salt,
            uint256[] calldata extensions
        );
}
