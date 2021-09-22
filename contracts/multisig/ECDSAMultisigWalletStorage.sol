// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { EnumerableSet } from '../utils/EnumerableSet.sol';

library ECDSAMultisigWalletStorage {
    using EnumerableSet for EnumerableSet.AddressSet;

    struct Layout {
        uint256 quorum;
        EnumerableSet.AddressSet signers;
        mapping(address => mapping(uint256 => bool)) nonces;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ECDSAMultisigWallet');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }

    function isInvalidNonce(
        Layout storage l,
        address account,
        uint256 nonce
    ) internal view returns (bool) {
        return l.nonces[account][nonce];
    }

    function setInvalidNonce(
        Layout storage l,
        address account,
        uint256 nonce
    ) internal {
        l.nonces[account][nonce] = true;
    }

    function setQuorum(Layout storage l, uint256 quorum) internal {
        require(
            quorum <= l.signers.length(),
            'ECDSAMultisigWallet: insufficient signers to meet quorum'
        );
        l.quorum = quorum;
    }

    function isSigner(Layout storage l, address account)
        internal
        view
        returns (bool)
    {
        return l.signers.contains(account);
    }

    function addSigner(Layout storage l, address account) internal {
        require(
            l.signers.length() < 256,
            'ECDSAMultisigWallet: signer limit reached'
        );
        require(
            l.signers.add(account),
            'ECDSAMultisigWallet: failed to add signer'
        );
    }

    function removeSigner(Layout storage l, address account) internal {
        require(
            l.quorum <= l.signers.length() - 1,
            'ECDSAMultisigWallet: insufficient signers to meet quorum'
        );
        require(
            l.signers.remove(account),
            'ECDSAMultisigWallet: failed to remove signer'
        );
    }
}
