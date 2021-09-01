// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC165} from '../../../introspection/ERC165.sol';
import {ERC721Base} from '../base/ERC721Base.sol';
import {ERC721Enumerable} from './ERC721Enumerable.sol';

contract ERC721EnumerableMock is ERC721Enumerable, ERC721Base, ERC165 {
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

  function _handleApproveMessageValue (address, uint, uint) override internal {}

  function _handleTransferMessageValue (address, address, uint, uint) override internal {}
}
