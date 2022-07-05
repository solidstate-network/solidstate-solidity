// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ISafeOwnableInternal } from './ISafeOwnableInternal.sol';
import { OwnableInternal } from './OwnableInternal.sol';
import { OwnableStorage } from './OwnableStorage.sol';
import { SafeOwnableStorage } from './SafeOwnableStorage.sol';

abstract contract SafeOwnableInternal is ISafeOwnableInternal, OwnableInternal {
    using OwnableStorage for OwnableStorage.Layout;
    using SafeOwnableStorage for SafeOwnableStorage.Layout;

    modifier onlyNomineeOwner() {
        require(
            msg.sender == _nomineeOwner(),
            'SafeOwnable: sender must be nominee owner'
        );
        _;
    }

    /**
     * @notice get the nominated owner who has permission to call acceptOwnership
     */
    function _nomineeOwner() internal view virtual returns (address) {
        return SafeOwnableStorage.layout().nomineeOwner;
    }

    /**
     * @notice accept transfer of contract ownership
     */
    function _acceptOwnership() internal virtual {
        OwnableStorage.Layout storage l = OwnableStorage.layout();
        emit OwnershipTransferred(l.owner, msg.sender);
        l.setOwner(msg.sender);
        SafeOwnableStorage.layout().setNomineeOwner(address(0));
    }

    /**
     * @notice set nominee owner, granting permission to call acceptOwnership
     */
    function _transferOwnership(address account) internal virtual override {
        SafeOwnableStorage.layout().setNomineeOwner(account);
    }
}
