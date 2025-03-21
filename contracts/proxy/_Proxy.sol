// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC1967Storage } from '../storage/ERC1967Storage.sol';
import { _IProxy } from './_IProxy.sol';

abstract contract _Proxy is _IProxy {
    /**
     * @notice query the EIP-1967 proxy admin
     * @return admin address of admin account
     */
    function _getAdmin() internal view virtual returns (address admin) {
        admin = ERC1967Storage
            .layout(ERC1967Storage.DEFAULT_STORAGE_SLOT)
            .admin;
    }

    /**
     * @notice query the EIP-1967 logic implementation address
     * @return implementation address of implementation contract
     */
    function _getImplementation()
        internal
        view
        virtual
        returns (address implementation)
    {
        implementation = ERC1967Storage
            .layout(ERC1967Storage.DEFAULT_STORAGE_SLOT)
            .implementation;
    }

    /**
     * @notice update the EIP-1967 proxy admin
     * @param admin address of admin account
     */
    function _setAdmin(address admin) internal virtual {
        ERC1967Storage.Layout storage $ = ERC1967Storage.layout(
            ERC1967Storage.DEFAULT_STORAGE_SLOT
        );

        emit AdminChanged($.admin, admin);

        $.admin = admin;
    }

    /**
     * @notice update the EIP-1967 logic implementation address
     * @param implementation address of implementation contract
     */
    function _setImplementation(address implementation) internal virtual {
        ERC1967Storage
            .layout(ERC1967Storage.DEFAULT_STORAGE_SLOT)
            .implementation = implementation;

        emit Upgraded(implementation);
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
}
