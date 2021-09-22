// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { SafeOwnableStorage } from './SafeOwnableStorage.sol';

abstract contract SafeOwnableInternal {
    using SafeOwnableStorage for SafeOwnableStorage.Layout;

    modifier onlyNomineeOwner() {
        require(
            msg.sender == SafeOwnableStorage.layout().nomineeOwner,
            'SafeOwnable: sender must be nominee owner'
        );
        _;
    }
}
