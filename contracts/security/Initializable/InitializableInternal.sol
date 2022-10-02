// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { AddressUtils } from '../../utils/AddressUtils.sol';
import { InitializableStorage } from './InitializableStorage.sol';

abstract contract InitializableInternal {
    using AddressUtils for address;
    using InitializableStorage for InitializableStorage.Layout;

    event Initialized(uint8 version);

    error AlreadyInitialized();

    error NotInitializing();

    error IsInitializing();

    modifier initializer() {
        InitializableStorage.Layout storage l = InitializableStorage.layout();
        bool isTopLevelCall = !l.initializing;
        bool passed = (isTopLevelCall && l.initialized < 1) ||
            (!address(this).isContract() && l.initialized == 1);
        if (!passed) revert AlreadyInitialized();
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
        // require(
        //     !l.initializing && l.initialized < version,
        //     'Initializable: contract is already initialized'
        // );
        bool passed = !l.initializing && l.initialized < version;
        if (!passed) revert AlreadyInitialized();
        l.initialized = version;
        l.initializing = true;
        _;
        l.initializing = false;
        emit Initialized(version);
    }

    modifier onlyInitializing() {
        if (!InitializableStorage.layout().initializing)
            revert NotInitializing();
        _;
    }

    function _disableInitializers() internal virtual {
        InitializableStorage.Layout storage l = InitializableStorage.layout();
        if (l.initializing) revert IsInitializing();
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
