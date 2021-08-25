// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title Utility contract for supporting processing of multiple function calls in a single transaction
 */
abstract contract Multicall {
  /**
   * @notice batch function calls to the contract and return the results of each
   * @param data array of function call data payloads
   * @return results array of function call results
   */
  function multicall(bytes[] calldata data) external returns (bytes[] memory results) {
    results = new bytes[](data.length);

    for (uint i; i < data.length; i++) {
      (bool success, bytes memory returndata) = address(this).delegatecall(data[i]);

      if (success) {
        results[i] = returndata;
      } else {
        assembly {
          returndatacopy(0, 0, returndatasize())
          revert(0, returndatasize())
        }
      }
    }

    return results;
  }
}
