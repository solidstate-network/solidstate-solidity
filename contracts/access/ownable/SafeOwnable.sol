// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Ownable } from './Ownable.sol';
import { ISafeOwnable } from './ISafeOwnable.sol';
import { _Ownable } from './_Ownable.sol';
import { _SafeOwnable } from './_SafeOwnable.sol';

/**
 * @title Ownership access control based on ERC173 with ownership transfer safety check
 */
abstract contract SafeOwnable is ISafeOwnable, _SafeOwnable, Ownable {
    /**
     * @inheritdoc ISafeOwnable
     */
    function nomineeOwner() external view returns (address) {
        return _nomineeOwner();
    }

    /**
     * @inheritdoc ISafeOwnable
     */
    function acceptOwnership() external {
        _acceptOwnership();
    }

    function _transferOwnership(
        address account
    ) internal virtual override(_Ownable, _SafeOwnable) {
        super._transferOwnership(account);
    }
}
