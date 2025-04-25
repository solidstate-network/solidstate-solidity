// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IBeacon } from '../../beacon/IBeacon.sol';
import { ERC1967Storage } from '../../storage/ERC1967Storage.sol';
import { Address } from '../../utils/Address.sol';
import { Bytes32 } from '../../utils/Bytes32.sol';
import { _Proxy } from '../_Proxy.sol';
import { _IBeaconProxy } from './_IBeaconProxy.sol';

abstract contract _BeaconProxy is _IBeaconProxy, _Proxy {
    using Address for address;
    using Bytes32 for bytes32;

    /**
     * @inheritdoc _Proxy
     */
    function _getImplementation()
        internal
        view
        virtual
        override
        returns (address implementation)
    {
        implementation = IBeacon(_getBeacon()).implementation();
    }

    /**
     * @notice query the EIP-1967 beacon address
     * @return beacon beacon contract address
     */
    function _getBeacon() internal view virtual returns (address beacon) {
        beacon = ERC1967Storage.BEACON_STORAGE_SLOT.read().toAddress();
    }

    /**
     * @notice update the EIP-1967 beacon address
     * @param beacon beacon contract address
     */
    function _setBeacon(address beacon) internal virtual {
        ERC1967Storage.BEACON_STORAGE_SLOT.write(beacon.toBytes32());

        emit BeaconUpgraded(beacon);
    }
}
