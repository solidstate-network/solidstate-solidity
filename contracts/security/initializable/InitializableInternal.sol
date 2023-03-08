// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { AddressUtils } from '../../utils/AddressUtils.sol';
import { IInitializableInternal } from './IInitializableInternal.sol';
import { InitializableStorage } from './InitializableStorage.sol';

abstract contract InitializableInternal is IInitializableInternal {
    using AddressUtils for address;
    using InitializableStorage for InitializableStorage.Layout;

    modifier initializer() {
        InitializableStorage.Layout storage l = InitializableStorage.layout();
        if (l.initialized >= 1) revert Initializable__AlreadyInitialized();
        l.initialized = 1;
        _;
        emit Initialized(1);
    }

    modifier reinitializer(uint8 version) {
        InitializableStorage.Layout storage l = InitializableStorage.layout();
        if (l.initialized >= version)
            revert Initializable__AlreadyInitialized();
        l.initialized = version;
        _;
        emit Initialized(version);
    }

    function _disableInitializers() internal virtual {
        InitializableStorage.Layout storage l = InitializableStorage.layout();
        if (l.initialized < type(uint8).max) {
            l.initialized = type(uint8).max;
            emit Initialized(type(uint8).max);
        }
    }

    function _getInitializedVersion() internal view returns (uint8) {
        return InitializableStorage.layout().initialized;
    }
}
