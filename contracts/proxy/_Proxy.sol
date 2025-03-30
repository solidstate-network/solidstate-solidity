// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Slot } from '../data/Slot.sol';
import { _Context } from '../meta/_Context.sol';
import { Address } from '../utils/Address.sol';
import { Bytes32 } from '../utils/Bytes32.sol';
import { ERC1967Storage } from '../storage/ERC1967Storage.sol';
import { _IProxy } from './_IProxy.sol';

abstract contract _Proxy is _IProxy, _Context {
    using Address for address;
    using Bytes32 for bytes32;
    using Slot for Slot.StorageSlot;

    modifier onlyProxyAdmin() {
        if (_msgSender() != _getProxyAdmin()) {
            revert Proxy__SenderIsNotAdmin();
        }
        _;
    }

    /**
     * @notice query the EIP-1967 proxy admin
     * @return admin address of admin account
     */
    function _getProxyAdmin() internal view virtual returns (address admin) {
        admin = (ERC1967Storage.ADMIN_STORAGE_SLOT).read().toAddress();
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
            .IMPLEMENTATION_STORAGE_SLOT
            .read()
            .toAddress();
    }

    /**
     * @notice update the EIP-1967 proxy admin
     * @param admin address of admin account
     */
    function _setProxyAdmin(address admin) internal virtual {
        emit AdminChanged(
            ERC1967Storage.ADMIN_STORAGE_SLOT.read().toAddress(),
            admin
        );

        ERC1967Storage.ADMIN_STORAGE_SLOT.write(admin.toBytes32());
    }

    /**
     * @notice update the EIP-1967 logic implementation address
     * @param implementation address of implementation contract
     */
    function _setImplementation(address implementation) internal virtual {
        ERC1967Storage.IMPLEMENTATION_STORAGE_SLOT.write(
            implementation.toBytes32()
        );

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

    /**
     * @notice received ether is forwarded to the fallback function
     */
    function _receive() internal virtual {
        _fallback();
    }
}
