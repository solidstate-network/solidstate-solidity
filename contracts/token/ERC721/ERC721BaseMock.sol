// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC721Base } from './ERC721Base.sol';
import {ERC165Storage} from '../../introspection/ERC165Storage.sol';
import {IERC165, ERC165} from '../../introspection/ERC165.sol';

contract ERC721BaseMock is ERC721Base, ERC165 {
  using ERC165Storage for ERC165Storage.Layout;

  constructor () {
    // TODO: implement failing tests before setting supported interfaces
    // ERC165Storage.layout().setSupportedInterface(type(IERC165).interfaceId, true);
    // ERC165Storage.layout().setSupportedInterface(type(IERC721).interfaceId, true);
  }

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

  function checkOnERC721Received (
    address from,
    address to,
    uint tokenId,
    bytes memory data
  ) external returns (bool) {
    return _checkOnERC721Received(from, to, tokenId, data);
  }
}
