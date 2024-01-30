// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { ERC721Base } from '../base/ERC721Base.sol';
import { ERC721Enumerable } from './ERC721Enumerable.sol';

contract ERC721EnumerableMock is ERC721Enumerable, ERC721Base, ERC165Base {
    function mint(address account, uint256 tokenId) external {
        _mint(account, tokenId);
    }

    function burn(uint256 tokenId) external {
        _burn(tokenId);
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
