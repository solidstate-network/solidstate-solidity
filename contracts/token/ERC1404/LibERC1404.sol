// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

library LibERC1404 {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.ERC1404'
  );

  struct Layout {
    mapping (uint8 => string) messages;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }

  function initialize (
    uint8[] memory errorCodes, string[] memory errorMessages
  ) internal {
    require(errorCodes.length == errorMessages.length, 'TODO');
    mapping (uint8 => string) storage messages = LibERC1404.layout().messages;

    for (uint i; i < errorCodes.length; i++) {
      messages[errorCodes[i]] = errorMessages[i];
    }
  }
}
