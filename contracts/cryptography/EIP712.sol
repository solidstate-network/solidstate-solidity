// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title EIP-712 typed structured data hashing and signing
 * @dev see https://eips.ethereum.org/EIPS/eip-712
 */
library EIP712 {
    bytes32 internal constant EIP712_TYPE_HASH =
        keccak256(
            'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
        );

    /**
     * @notice calculate unique EIP-712 domain separator
     * @dev name and version inputs are hashed as required by EIP-712 because they are of dynamic-length types
     * @dev implementation of EIP712Domain struct type excludes the optional salt parameter
     * @param nameHash hash of ERC20Metadata token name
     * @param versionHash hash of signing domain version
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator(
        bytes32 nameHash,
        bytes32 versionHash
    ) internal view returns (bytes32 domainSeparator) {
        // no need for assembly, running very rarely
        domainSeparator = keccak256(
            abi.encode(
                EIP712_TYPE_HASH,
                nameHash,
                versionHash,
                block.chainid,
                address(this)
            )
        );
    }
}
