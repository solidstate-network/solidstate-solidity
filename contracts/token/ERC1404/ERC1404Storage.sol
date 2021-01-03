// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

library ERC1404Storage {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.ERC1404'
  );

  struct Layout {
    mapping (uint8 => string) restrictions;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }

  function setRestrictions (
    uint8[] memory restrictionCodes,
    string[] memory restrictionMessages
  ) internal {
    require(restrictionCodes.length == restrictionMessages.length, 'TODO');
    mapping (uint8 => string) storage restrictions = layout().restrictions;

    for (uint i; i < restrictionCodes.length; i++) {
      restrictions[restrictionCodes[i]] = restrictionMessages[i];
    }
  }

  function getRestrictionMessage (
    Layout storage l,
    uint8 restrictionCode
  ) internal view returns (string memory) {
    return l.restrictions[restrictionCode];
  }
}
