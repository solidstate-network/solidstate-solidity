// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

library StorageUtils {
    /**
     * @notice calculate the EIP-7201 storage slot for a given string id
     * @dev id parameter should not contain whitespace
     * @dev see https://eips.ethereum.org/EIPS/eip-7201
     * @param id namespace id
     */
    function calculateErc7201StorageSlot(
        string memory id
    ) internal pure returns (bytes32 slot) {
        slot =
            keccak256(abi.encode(uint256(keccak256(bytes(id))) - 1)) &
            ~bytes32(uint256(0xff));
    }
}
