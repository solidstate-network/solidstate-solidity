// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC721Base, IERC721} from './ERC721Base.sol';
import {ERC165Storage} from '../../introspection/ERC165Storage.sol';
import {IERC165, ERC165} from '../../introspection/ERC165.sol';

contract ERC721BaseMock is ERC721Base, ERC165 {
  using ERC165Storage for ERC165Storage.Layout;

  constructor () {
    ERC165Storage.layout().setSupportedInterface(type(IERC165).interfaceId, true);
    ERC165Storage.layout().setSupportedInterface(type(IERC721).interfaceId, true);
  }

  function isApprovedOrOwner (
    address spender,
    uint tokenId
  ) external view returns (bool) {
    return _isApprovedOrOwner(spender, tokenId);
  }

  function transfer (
    address from,
    address to,
    uint tokenId
  ) external {
    _transfer(from, to, tokenId);
  }

  function safeTransfer (
    address from,
    address to,
    uint tokenId,
    bytes calldata data
  ) external {
    _safeTransfer(from, to, tokenId, data);
  }

  function mint (
    address account,
    uint tokenId
  ) external {
    _mint(account, tokenId);
  }

  function safeMint (
    address account,
    uint tokenId
  ) external {
    _safeMint(account, tokenId);
  }

  function safeMint (
    address account,
    uint tokenId,
    bytes calldata data
  ) external {
    _safeMint(account, tokenId, data);
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
