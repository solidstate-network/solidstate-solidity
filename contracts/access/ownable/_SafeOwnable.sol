// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ERC173Storage } from '../../storage/ERC173Storage.sol';
import { _ISafeOwnable } from './_ISafeOwnable.sol';
import { _Ownable } from './_Ownable.sol';

abstract contract _SafeOwnable is _ISafeOwnable, _Ownable {
    modifier onlyNomineeOwner() {
        if (msg.sender != _nomineeOwner())
            revert SafeOwnable__NotNomineeOwner();
        _;
    }

    /**
     * @notice get the nominated owner who has permission to call acceptOwnership
     */
    function _nomineeOwner() internal view virtual returns (address) {
        return
            ERC173Storage
                .layout(ERC173Storage.DEFAULT_STORAGE_SLOT)
                .nomineeOwner;
    }

    /**
     * @notice accept transfer of contract ownership
     */
    function _acceptOwnership() internal virtual onlyNomineeOwner {
        _setOwner(msg.sender);
        delete ERC173Storage
            .layout(ERC173Storage.DEFAULT_STORAGE_SLOT)
            .nomineeOwner;
    }

    /**
     * @notice grant permission to given address to claim contract ownership
     */
    function _transferOwnership(
        address account
    ) internal virtual override onlyOwner {
        _setNomineeOwner(account);
    }

    /**
     * @notice set nominee owner
     */
    function _setNomineeOwner(address account) internal virtual {
        ERC173Storage
            .layout(ERC173Storage.DEFAULT_STORAGE_SLOT)
            .nomineeOwner = account;
    }
}
