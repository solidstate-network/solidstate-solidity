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
   * @return facets_ array of structured facet data
   */
  function facets () external view returns (Facet[] memory facets_);

  /**
   * @notice get all selectors for given facet address
   * @param _facet address of facet to query
   * @return facetFunctionSelectors_ array of function selectors
   */
  function facetFunctionSelectors (
    address _facet
  ) external view returns (bytes4[] memory facetFunctionSelectors_);

  /**
   * @notice get addresses of all facets used by diamond
   * @return facetAddresses_ array of facet addresses
   */
  function facetAddresses () external view returns (address[] memory facetAddresses_);

  /**
   * @notice get the address of the facet associated with given selector
   * @param _functionSelector function selector to query
   * @return facetAddress_ facet address (zero address if not found)
   */
  function facetAddress (
    bytes4 _functionSelector
  ) external view returns (address facetAddress_);
}
