// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165 } from '../../../interfaces/IERC165.sol';
import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { ERC721Base, IERC721 } from './ERC721Base.sol';

contract ERC721BaseMock is ERC721Base, ERC165Base {
    constructor() {
        _setSupportsInterface(type(IERC165).interfaceId, true);
        _setSupportsInterface(type(IERC721).interfaceId, true);
    }

    function isApprovedOrOwner(
        address spender,
        uint256 tokenId
    ) external view returns (bool) {
        return _isApprovedOrOwner(spender, tokenId);
    }

    function transfer(address from, address to, uint256 tokenId) external {
        _transfer(from, to, tokenId);
    }

    function safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external {
        _safeTransfer(from, to, tokenId, data);
    }

    function mint(address account, uint256 tokenId) external {
        _mint(account, tokenId);
    }

    function safeMint(address account, uint256 tokenId) external {
        _safeMint(account, tokenId);
    }

    function safeMint(
        address account,
        uint256 tokenId,
        bytes calldata data
    ) external {
        _safeMint(account, tokenId, data);
    }

    function burn(uint256 tokenId) external {
        _burn(tokenId);
    }

    function checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) external returns (bool) {
        return _checkOnERC721Received(from, to, tokenId, data);
    }

    function _handleApproveMessageValue(
        address,
        uint256,
        uint256
    ) internal override {}

    function _handleTransferMessageValue(
        address,
        address,
        uint256,
        uint256
    ) internal override {}
}
