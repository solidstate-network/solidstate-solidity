// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { InitializableStorage } from '../../storage/InitializableStorage.sol';
import { AddressUtils } from '../../utils/AddressUtils.sol';
import { _IInitializable } from './_IInitializable.sol';

abstract contract _Initializable is _IInitializable {
    using AddressUtils for address;
    using InitializableStorage for InitializableStorage.Layout;

    modifier initializer() {
        _setInitializedVersion(1);
        _;
    }

    modifier reinitializer(uint8 version) {
        _setInitializedVersion(version);
        _;
    }

    function _setInitializedVersion(uint8 version) internal virtual {
        InitializableStorage.Layout storage $ = InitializableStorage.layout(
            InitializableStorage.DEFAULT_STORAGE_SLOT
        );

        if ($.initialized >= version)
            revert Initializable__AlreadyInitialized();

        $.initialized = version;
        emit Initialized(version);
    }

    function _getInitializedVersion()
        internal
        view
        virtual
        returns (uint8 version)
    {
        version = InitializableStorage
            .layout(InitializableStorage.DEFAULT_STORAGE_SLOT)
            .initialized;
    }
}
