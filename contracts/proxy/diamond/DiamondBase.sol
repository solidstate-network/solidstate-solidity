// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import '../../proxy/Proxy.sol';
import '../../utils/EnumerableSet.sol';
import './DiamondBaseStorage.sol';

contract DiamondBase is Proxy {
  // TODO: selector aliases

  function _getImplementation () override internal view returns (address) {
    // storage layout is not retrieved via function call due to gas considerations
    DiamondBaseStorage.Layout storage l;
    bytes32 slot = DiamondBaseStorage.STORAGE_SLOT;
    assembly { l.slot := slot }

    address implementation = l.selectorFacet[msg.sig];

    if (implementation == address(0)) {
      implementation = l.fallbackAddress;
      require(implementation != address(0), 'DiamondBase: no facet found for function signature');
    }

    return implementation;
  }
}
