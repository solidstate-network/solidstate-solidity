// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC721Base } from './ERC721Base.sol';
import { ERC721Enumerable } from './ERC721Enumerable.sol';

contract ERC721EnumerableMock is ERC721Enumerable, ERC721Base {
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
}
