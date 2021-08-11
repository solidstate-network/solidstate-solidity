// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC721Base } from './ERC721Base.sol';

contract ERC721BaseMock is ERC721Base {
  function transfer (
    address from,
    address to,
    uint tokenId
  ) external {
    _transfer(from, to, tokenId);
  }

  function mint (
    address account,
    uint tokenId
  ) external {
    _mint(account, tokenId);
  }

  function burn (
    uint tokenId
  ) external {
    _burn(tokenId);
  }

  function __approve (
    address to,
    uint tokenId
  ) external {
    _approve(to, tokenId);
  }
}
