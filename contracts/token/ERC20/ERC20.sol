// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC20Base.sol';
import './ERC20Extended.sol';
import './ERC20Metadata.sol';

contract ERC20 is ERC20Base, ERC20Extended, ERC20Metadata {
  constructor (string memory name, string memory symbol, uint supply)
  ERC20Metadata(name, symbol, 18)
  {
    _mint(msg.sender, supply);
  }
}
