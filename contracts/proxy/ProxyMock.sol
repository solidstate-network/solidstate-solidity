// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './Proxy.sol';

contract ProxyMock is Proxy {
  address private _impl;

  constructor (
    address implementation
  ) {
    _impl = implementation;
  }

  function _getImplementation () override internal returns (address) {
    return _impl;
  }
}
