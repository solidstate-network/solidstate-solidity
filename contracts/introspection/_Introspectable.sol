// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IIntrospectable } from './_IIntrospectable.sol';
import { ERC165BaseStorage } from './ERC165BaseStorage.sol';

/**
 * @title ERC165 implementation
 */
abstract contract _Introspectable is _IIntrospectable {
    /**
     * @notice indicates whether an interface is already supported based on the interfaceId
     * @param interfaceId id of interface to check
     * @return bool indicating whether interface is supported
     */
    function _supportsInterface(
        bytes4 interfaceId
    ) internal view virtual returns (bool) {
        return
            ERC165BaseStorage
                .layout(ERC165BaseStorage.DEFAULT_STORAGE_SLOT)
                .supportedInterfaces[interfaceId];
    }

    /**
     * @notice sets status of interface support
     * @param interfaceId id of interface to set status for
     * @param status boolean indicating whether interface will be set as supported
     */
    function _setSupportsInterface(
        bytes4 interfaceId,
        bool status
    ) internal virtual {
        if (interfaceId == 0xffffffff)
            revert Introspectable__InvalidInterfaceId();
        ERC165BaseStorage
            .layout(ERC165BaseStorage.DEFAULT_STORAGE_SLOT)
            .supportedInterfaces[interfaceId] = status;
    }
}
