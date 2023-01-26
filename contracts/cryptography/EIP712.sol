// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title EIP-712 typed structured data hashing and signing
 * @dev see https://eips.ethereum.org/EIPS/eip-712
 */
library EIP712 {
    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of ERC20Metadata token name
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator(
        bytes32 nameHash
    ) internal view returns (bytes32 domainSeparator) {
        // no need for assembly, running very rarely
        domainSeparator = keccak256(
            abi.encode(
                keccak256(
                    'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
                ),
                nameHash,
                keccak256(bytes('1')), // Version
                chainId(),
                address(this)
            )
        );
    }

    /**
     * @notice get the current chain ID
     * @return chainId chain ID
     */
    function chainId() internal view returns (uint256 chainId) {
        assembly {
            chainId := chainid()
        }
    }
}
