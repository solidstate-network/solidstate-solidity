// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '../Proxy.sol';
import './DiamondBaseStorage.sol';
import './IDiamondLoupe.sol';
import './IDiamondCuttable.sol';

/**
 * @title EIP-2535 "Diamond" proxy base contract
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
contract DiamondBase is Proxy {
  constructor(
    IDiamondCuttable.FacetCut[] memory _diamondCut
  ) payable {
    DiamondBaseStorage.diamondCut(_diamondCut, address(0), new bytes(0));
  }

  // TODO: selector aliases

  function _getImplementation () override internal view returns (address) {
    // storage layout is not retrieved via function call due to gas considerations
    DiamondBaseStorage.Layout storage l;
    bytes32 slot = DiamondBaseStorage.STORAGE_SLOT;
    assembly { l.slot := slot }

    address implementation = address(bytes20(l.facets[msg.sig]));

    if (implementation == address(0)) {
      implementation = l.fallbackAddress;
      require(
        implementation != address(0),
        'DiamondBase: no facet found for function signature'
      );
    }

    return implementation;
  }
}
