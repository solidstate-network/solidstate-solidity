// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import '@openzeppelin/contracts/utils/EnumerableSet.sol';
import './DiamondBaseStorage.sol';

contract DiamondBase {
  // TODO: selector aliases

  fallback () external payable {
    // storage layout is not retrieved via function call due to gas considerations
    DiamondBaseStorage.Layout storage l;
    bytes32 slot = DiamondBaseStorage.STORAGE_SLOT;
    assembly { l.slot := slot }

    address facet = l.selectorFacet[msg.sig];

    if (facet == address(0)) {
      facet = l.fallbackAddress;
      require(facet != address(0), 'DiamondBase: no facet found for function signature');
    }

    assembly {
      calldatacopy(0, 0, calldatasize())
      let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
      returndatacopy(0, 0, returndatasize())

      switch result
        case 0 { revert(0, returndatasize()) }
        default { return (0, returndatasize()) }
    }
  }
}
