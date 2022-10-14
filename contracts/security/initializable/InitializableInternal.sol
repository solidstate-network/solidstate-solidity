// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { AddressUtils } from '../../utils/AddressUtils.sol';
import { IInitializableInternal } from './IInitializableInternal.sol';
import { InitializableStorage } from './InitializableStorage.sol';

abstract contract InitializableInternal is IInitializableInternal {
    using AddressUtils for address;
    using InitializableStorage for InitializableStorage.Layout;

    event Initialized(uint8 version);

    modifier initializer() {
        InitializableStorage.Layout storage l = InitializableStorage.layout();
        bool isTopLevelCall = !l.initializing;
        if (
            (!isTopLevelCall || l.initialized >= 1) &&
            (address(this).isContract() || l.initialized != 1)
        ) revert Initializable__AlreadyInitialized();
        l.initialized = 1;
        if (isTopLevelCall) {
            l.initializing = true;
        }
        _;
        if (isTopLevelCall) {
            l.initializing = false;
            emit Initialized(1);
        }
    }

    modifier reinitializer(uint8 version) {
        InitializableStorage.Layout storage l = InitializableStorage.layout();
        if (l.initializing || l.initialized >= version)
            revert Initializable__AlreadyInitialized();
        l.initialized = version;
        l.initializing = true;
        _;
        l.initializing = false;
        emit Initialized(version);
    }

    modifier onlyInitializing() {
        if (!_isInitializing()) revert Initializable__NotInitializing();
        _;
    }

    function _disableInitializers() internal virtual {
        InitializableStorage.Layout storage l = InitializableStorage.layout();
        if (l.initializing) revert Initializable__IsInitializing();
        if (l.initialized < type(uint8).max) {
            l.initialized = type(uint8).max;
            emit Initialized(type(uint8).max);
        }
    }

    function _getInitializedVersion() internal view returns (uint8) {
        return InitializableStorage.layout().initialized;
    }

    function _isInitializing() internal view returns (bool) {
        return InitializableStorage.layout().initializing;
    }
}
