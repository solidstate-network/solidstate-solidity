// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC721Metadata } from './ERC721Metadata.sol';
import { ERC721MetadataStorage } from './ERC721MetadataStorage.sol';

contract ERC721MetadataMock is ERC721Metadata {
  constructor (
    string memory name,
    string memory symbol,
    string memory baseURI
  ) {
    ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage.layout();
    l.name = name;
    l.symbol = symbol;
    l.baseURI = baseURI;
  }
}
