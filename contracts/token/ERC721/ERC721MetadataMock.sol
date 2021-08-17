// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC721Metadata } from './ERC721Metadata.sol';
import { ERC721MetadataStorage } from './ERC721MetadataStorage.sol';
import {ERC165} from '../../introspection/ERC165.sol';

contract ERC721MetadataMock is ERC721Metadata, ERC165 {
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

  function _handleApproveMessageValue (address, uint, uint) override internal {}

  function _handleTransferMessageValue (address, address, uint, uint) override internal {}
}
