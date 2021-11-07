// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library MetamorphicFactoryStorage {
    struct Layout {
        address metamorphicImplementation;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.MetamorphicFactory');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }

    function setMetamorphicImplementation(
        Layout storage l,
        address metamorphicImplementation
    ) internal {
        l.metamorphicImplementation = metamorphicImplementation;
    }
}
