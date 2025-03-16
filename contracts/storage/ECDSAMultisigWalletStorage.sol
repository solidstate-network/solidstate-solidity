// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { EnumerableSet } from '../data/EnumerableSet.sol';

library ECDSAMultisigWalletStorage {
    /**
     * @custom:storage-location erc7201:solidstate.contracts.storage.ECDSAMultisigWallet
     */
    struct Layout {
        uint256 quorum;
        EnumerableSet.AddressSet signers;
        mapping(address account => mapping(uint256 nonce => bool invalidationStatus)) nonces;
    }

    bytes32 internal constant DEFAULT_STORAGE_SLOT =
        keccak256(
            abi.encode(
                uint256(
                    keccak256(
                        bytes(
                            'solidstate.contracts.storage.ECDSAMultisigWallet'
                        )
                    )
                ) - 1
            )
        ) & ~bytes32(uint256(0xff));

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(bytes32 slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
