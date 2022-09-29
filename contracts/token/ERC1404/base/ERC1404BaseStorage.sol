// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

library ERC1404BaseStorage {
    error ERC1404BaseStorage__ArrayLengthMismatch();

    struct Layout {
        mapping(uint8 => string) restrictions;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ERC1404Base');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }

    function setRestrictions(
        Layout storage l,
        uint8[] memory restrictionCodes,
        string[] memory restrictionMessages
    ) internal {
        if (restrictionCodes.length != restrictionMessages.length)
            revert ERC1404BaseStorage__ArrayLengthMismatch();

        mapping(uint8 => string) storage restrictions = l.restrictions;

        unchecked {
            for (uint256 i; i < restrictionCodes.length; i++) {
                restrictions[restrictionCodes[i]] = restrictionMessages[i];
            }
        }
    }

    function getRestrictionMessage(Layout storage l, uint8 restrictionCode)
        internal
        view
        returns (string memory)
    {
        return l.restrictions[restrictionCode];
    }
}
