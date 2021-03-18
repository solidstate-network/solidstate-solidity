// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
interface IDiamondLoupe {
  struct Facet {
    address facetAddress;
    bytes4[] functionSelectors;
  }

  /**
   * @notice get all facets and their selectors
   * @return diamondFacets array of structured facet data
   */
  function facets () external view returns (Facet[] memory diamondFacets);

  /**
   * @notice get all selectors for given facet address
   * @param facet address of facet to query
   * @return selectors array of function selectors
   */
  function facetFunctionSelectors (
    address facet
  ) external view returns (bytes4[] memory selectors);

  /**
   * @notice get addresses of all facets used by diamond
   * @return addresses array of facet addresses
   */
  function facetAddresses () external view returns (address[] memory addresses);

  /**
   * @notice get the address of the facet associated with given selector
   * @param selector function selector to query
   * @return facet facet address (zero address if not found)
   */
  function facetAddress (
    bytes4 selector
  ) external view returns (address facet);
}
