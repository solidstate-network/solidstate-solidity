// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './IERC165.sol';
import './ERC165Storage.sol';

abstract contract ERC165 is IERC165 {
  using ERC165Storage for ERC165Storage.Layout;

  function supportsInterface (bytes4 interfaceId) override public view returns (bool) {
    return ERC165Storage.layout().isSupportedInterface(interfaceId);
  }
}
