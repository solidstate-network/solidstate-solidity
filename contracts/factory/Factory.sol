// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Factory for arbitrary code deployment using the "CREATE" and "CREATE2" opcodes
 */
library Factory {
    error Factory__FailedDeployment();

    /**
     * @notice deploy contract code using "CREATE" opcode
     * @param initCode contract initialization code
     * @return deployment address of deployed contract
     */
    function deploy(
        bytes memory initCode
    ) internal returns (address deployment) {
        assembly {
            let encoded_data := add(0x20, initCode)
            let encoded_size := mload(initCode)
            deployment := create(0, encoded_data, encoded_size)
        }

        if (deployment == address(0)) revert Factory__FailedDeployment();
    }

    /**
     * @notice deploy contract code using "CREATE2" opcode
     * @dev reverts if deployment is not successful (likely because salt has already been used)
     * @param initCode contract initialization code
     * @param salt input for deterministic address calculation
     * @return deployment address of deployed contract
     */
    function deploy(
        bytes memory initCode,
        bytes32 salt
    ) internal returns (address deployment) {
        assembly {
            let encoded_data := add(0x20, initCode)
            let encoded_size := mload(initCode)
            deployment := create2(0, encoded_data, encoded_size, salt)
        }

        if (deployment == address(0)) revert Factory__FailedDeployment();
    }

    /**
     * @notice calculate the _deployMetamorphicContract deployment address for a given salt
     * @param initCodeHash hash of contract initialization code
     * @param salt input for deterministic address calculation
     * @return deployment address
     */
    function calculateDeploymentAddress(
        bytes32 initCodeHash,
        bytes32 salt
    ) internal view returns (address) {
        return
            address(
                uint160(
                    uint256(
                        keccak256(
                            abi.encodePacked(
                                hex'ff',
                                address(this),
                                salt,
                                initCodeHash
                            )
                        )
                    )
                )
            );
    }
}
