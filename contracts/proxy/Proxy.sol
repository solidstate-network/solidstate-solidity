// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title Base proxy contract
 */
abstract contract Proxy {
  /**
   * @notice delegate all calls to implementation contract
   * @dev memory location in use by assembly may be unsafe in other contexts
   */
  fallback () external payable {
    address implementation = _getImplementation();

    assembly {
      calldatacopy(0, 0, calldatasize())
      let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)
      returndatacopy(0, 0, returndatasize())

      switch result
      case 0 { revert(0, returndatasize()) }
      default { return (0, returndatasize()) }
    }
  }

  /**
   * @notice get logic implementation address
   * @return implementation address
   */
  function _getImplementation () virtual internal returns (address);
}
