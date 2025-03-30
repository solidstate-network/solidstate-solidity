// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Slot } from '../data/Slot.sol';

library ERC1967Storage {
    // this storage layout is compatible with both ERC1967 and ERC7201
    // however, the large size of the struct causes compiler warnings
    //
    // /**
    //  * @custom:storage-location erc7201:solidstate.layout.ERC1967
    //  */
    // struct Layout {
    //     bytes32[13628586471354763981941763948137335272053484972029428504726465057908568640444] __gap0;
    //     address implementation;
    //     bytes32[49712180362929532635428621347237427253669371308002068989663457074593002099091] __gap1;
    //     address beacon;
    //     bytes32[7803238311281244947635719412648923328216373619314056378660255582410022462386] __gap2;
    //     address admin;
    // }
    //
    // Slot.StorageSlot internal constant DEFAULT_STORAGE_SLOT =
    //     Slot.StorageSlot.wrap(
    //         keccak256(
    //             abi.encode(
    //                 uint256(keccak256(bytes('solidstate.layout.ERC1967'))) - 1
    //             )
    //         ) & ~bytes32(uint256(0xff))
    //     );

    Slot.StorageSlot internal constant IMPLEMENTATION_STORAGE_SLOT =
        Slot.StorageSlot.wrap(
            bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)
        );
    Slot.StorageSlot internal constant BEACON_STORAGE_SLOT =
        Slot.StorageSlot.wrap(
            bytes32(uint256(keccak256('eip1967.proxy.beacon')) - 1)
        );
    Slot.StorageSlot internal constant ADMIN_STORAGE_SLOT =
        Slot.StorageSlot.wrap(
            bytes32(uint256(keccak256('eip1967.proxy.admin')) - 1)
        );
}
