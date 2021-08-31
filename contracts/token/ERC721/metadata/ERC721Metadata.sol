// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {UintUtils} from '../../../utils/UintUtils.sol';
import {ERC721Base, ERC721BaseStorage} from '../base/ERC721Base.sol';
import {ERC721MetadataStorage} from './ERC721MetadataStorage.sol';
import {IERC721Metadata} from './IERC721Metadata.sol';

/**
 * @notice ERC721 metadata extensions
 */
abstract contract ERC721Metadata is IERC721Metadata, ERC721Base {
  using UintUtils for uint;

  /**
   * @notice inheritdoc IERC721Metadata
   */
  function name () override public view returns (string memory) {
    return ERC721MetadataStorage.layout().name;
  }

  /**
   * @notice inheritdoc IERC721Metadata
   */
  function symbol () override public view returns (string memory) {
    return ERC721MetadataStorage.layout().symbol;
  }

  /**
   * @notice inheritdoc IERC721Metadata
   */
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

  /**
   * @notice ERC721 hook: clear per-token URI data on burn
   * @inheritdoc ERC721Base
   */
  function _beforeTokenTransfer (address from, address to, uint tokenId) virtual override internal {
    super._beforeTokenTransfer(from, to, tokenId);

    if (to == address(0)) {
      delete ERC721MetadataStorage.layout().tokenURIs[tokenId];
    }
  }
}
