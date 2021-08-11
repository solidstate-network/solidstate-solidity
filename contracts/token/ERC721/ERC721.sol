// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC721Base} from './ERC721Base.sol';
import {ERC721Enumerable} from './ERC721Enumerable.sol';
import {ERC721Metadata} from './ERC721Metadata.sol';
import {ERC165} from '../../introspection/ERC165.sol';


/**
 * @notice SolidState ERC721 implementation, including recommended extensions
 */
abstract contract ERC721 is ERC721Base, ERC721Enumerable, ERC721Metadata, ERC165 {
  function _beforeTokenTransfer (
    address from,
    address to,
    uint tokenId
  )
    virtual override(ERC721Base, ERC721Metadata) internal
  {}
}
