// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ERC721Base.sol';
import './ERC721Enumerable.sol';
import './ERC721Metadata.sol';

abstract contract ERC721 is ERC721Base, ERC721Enumerable, ERC721Metadata {
  function _beforeTokenTransfer (
    address from,
    address to,
    uint tokenId
  )
    virtual override(ERC721Base, ERC721Metadata) internal
  {}
}
