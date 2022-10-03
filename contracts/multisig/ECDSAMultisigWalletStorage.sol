// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { EnumerableSet } from '../utils/EnumerableSet.sol';

library ECDSAMultisigWalletStorage {
    using EnumerableSet for EnumerableSet.AddressSet;

    error ECDSAMultisigWalletStorage__AddSignerFailed();
    error ECDSAMultisigWalletStorage__InsufficientSigners();
    error ECDSAMultisigWalletStorage__RemoveSignerFailed();
    error ECDSAMultisigWalletStorage__SignerLimitReached();

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
        if (quorum > l.signers.length())
            revert ECDSAMultisigWalletStorage__InsufficientSigners();
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
        if (l.signers.length() >= 256)
            revert ECDSAMultisigWalletStorage__SignerLimitReached();
        if (!l.signers.add(account))
            revert ECDSAMultisigWalletStorage__AddSignerFailed();
    }

    function removeSigner(Layout storage l, address account) internal {
        if (l.quorum > l.signers.length() - 1)
            revert ECDSAMultisigWalletStorage__InsufficientSigners();
        if (!l.signers.remove(account))
            revert ECDSAMultisigWalletStorage__RemoveSignerFailed();
    }
}
