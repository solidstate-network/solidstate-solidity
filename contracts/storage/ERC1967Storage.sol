// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

library ERC1967Storage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.ERC1967
     */
    struct Layout {
        bytes32[13628586471354763981941763948137335272053484972029428504726465057908568640444] __gap0;
        address implementation;
        bytes32[49712180362929532635428621347237427253669371308002068989663457074593002099091] __gap1;
        address beacon;
        bytes32[7803238311281244947635719412648923328216373619314056378660255582410022462386] __gap2;
        address admin;
    }

    /**
     * @custom:storage-location erc1967:eip1967.proxy.implementation
     */
    struct ImplementationLayout {
        address implementation;
    }

    /**
     * @custom:storage-location erc1967:eip1967.proxy.beacon
     */
    struct BeaconLayout {
        address beacon;
    }

    /**
     * @custom:storage-location erc1967:eip1967.proxy.admin
     */
    struct AdminLayout {
        address admin;
    }

    bytes32 internal constant IMPLEMENTATION_STORAGE_SLOT =
        bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1);
    bytes32 internal constant BEACON_STORAGE_SLOT =
        bytes32(uint256(keccak256('eip1967.proxy.beacon')) - 1);
    bytes32 internal constant ADMIN_STORAGE_SLOT =
        bytes32(uint256(keccak256('eip1967.proxy.admin')) - 1);

    bytes32 internal constant DEFAULT_STORAGE_SLOT =
        keccak256(
            abi.encode(
                uint256(keccak256(bytes('solidstate.layout.ERC1967'))) - 1
            )
        ) & ~bytes32(uint256(0xff));

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(bytes32 slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }

    function implementationLayout()
        internal
        pure
        returns (ImplementationLayout storage $)
    {
        bytes32 slot = IMPLEMENTATION_STORAGE_SLOT;

        assembly {
            $.slot := slot
        }
    }

    function beaconLayout() internal pure returns (BeaconLayout storage $) {
        bytes32 slot = BEACON_STORAGE_SLOT;

        assembly {
            $.slot := slot
        }
    }

    function adminLayout() internal pure returns (AdminLayout storage $) {
        bytes32 slot = ADMIN_STORAGE_SLOT;

        assembly {
            $.slot := slot
        }
    }
}
