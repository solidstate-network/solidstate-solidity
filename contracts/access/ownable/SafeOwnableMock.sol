// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SafeOwnable } from './SafeOwnable.sol';

contract SafeOwnableMock is SafeOwnable {
    constructor(address owner) {
        _setOwner(owner);
    }

    function modifier_onlyNomineeOwner() external onlyNomineeOwner {
        // do nothing
    }

    function __owner() external view returns (address) {
        return _owner();
    }

    function __nomineeOwner() external view returns (address) {
        return _nomineeOwner();
    }

    function __acceptOwnership() external {
        _acceptOwnership();
    }

    function __transferOwnership(address account) external {
        _transferOwnership(account);
    }

    function __setNomineeOwner(address account) external {
        _setNomineeOwner(account);
    }
}
