// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ERC721Base.sol';
import './ERC721MetadataStorage.sol';
import './IERC721Metadata.sol';
import '../../utils/UintUtils.sol';

abstract contract ERC721Metadata is IERC721Metadata, ERC721Base {
  using UintUtils for uint;

  function name () override public view returns (string memory) {
    return ERC721MetadataStorage.layout().name;
  }

  function symbol () override public view returns (string memory) {
    return ERC721MetadataStorage.layout().symbol;
  }

  function tokenURI (uint tokenId) override public view returns (string memory) {
    require(ERC721BaseStorage.exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');

    ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage.layout();

    string memory tokenIdURI = l.tokenURIs[tokenId];
    string memory baseURI = l.baseURI;

    if (bytes(baseURI).length == 0) {
      return tokenIdURI;
    } else if (bytes(tokenIdURI).length > 0) {
      return string(abi.encodePacked(baseURI, tokenIdURI));
    } else {
      return string(abi.encodePacked(baseURI, tokenId.toString()));
    }
  }

  function _beforeTokenTransfer (address from, address to, uint tokenId) virtual override internal {
    super._beforeTokenTransfer(from, to, tokenId);

    if (to == address(0)) {
      // TODO: clear metadata only if present
      delete ERC721MetadataStorage.layout().tokenURIs[tokenId];
    }
  }
}
