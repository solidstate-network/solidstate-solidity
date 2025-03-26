// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ProxyStorage } from '../storage/ProxyStorage.sol';
import { _IProxy } from './_IProxy.sol';

abstract contract _Proxy is _IProxy {
    /**
     * @notice get logic implementation address
     * @return implementation address of implementation contract
     */
    function _getImplementation()
        internal
        view
        virtual
        returns (address implementation)
    {
        implementation = ProxyStorage
            .layout(ProxyStorage.DEFAULT_STORAGE_SLOT)
            .implementation;
    }

    /**
     * @notice set logic implementation address
     * @param implementation address of implementation contract
     */
    function _setImplementation(address implementation) internal virtual {
        ProxyStorage
            .layout(ProxyStorage.DEFAULT_STORAGE_SLOT)
            .implementation = implementation;
    }

    /**
     * @notice delegate all calls to implementation contract
     * @dev memory location in use by assembly may be unsafe in other contexts
     * @dev function declares no return value, but data is returned via assembly
     */
    function _fallback() internal virtual {
        address implementation = _getImplementation();

        assembly {
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(
                gas(),
                implementation,
                0,
                calldatasize(),
                0,
                0
            )

            returndatacopy(0, 0, returndatasize())

            if iszero(result) {
                revert(0, returndatasize())
            }

            if returndatasize() {
                return(0, returndatasize())
            }

            if extcodesize(implementation) {
                return(0, returndatasize())
            }
        }

        revert Proxy__ImplementationIsNotContract();
    }

    /**
     * @notice received ether is forwarded to the fallback function
     */
    function _receive() internal virtual {
        _fallback();
    }
}
