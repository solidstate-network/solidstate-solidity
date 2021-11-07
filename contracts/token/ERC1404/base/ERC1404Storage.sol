// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library ERC1404Storage {
    struct Layout {
        mapping(uint8 => string) restrictions;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ERC1404');

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
        require(
            restrictionCodes.length == restrictionMessages.length,
            'ERC1404: restrictionCodes and restrictionMessages length mismatch'
        );

        mapping(uint8 => string) storage restrictions = l.restrictions;

        for (uint256 i; i < restrictionCodes.length; i++) {
            restrictions[restrictionCodes[i]] = restrictionMessages[i];
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
