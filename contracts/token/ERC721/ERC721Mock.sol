// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC165 } from '../../introspection/IERC165.sol';
import { ERC165Storage } from '../../introspection/ERC165Storage.sol';
import { ERC721MetadataStorage } from './metadata/ERC721MetadataStorage.sol';
import { ERC721 } from './ERC721.sol';
import { IERC721 } from './IERC721.sol';

contract ERC721Mock is ERC721 {
    using ERC165Storage for ERC165Storage.Layout;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) {
        ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage.layout();
        l.name = name;
        l.symbol = symbol;
        l.baseURI = baseURI;

        ERC165Storage.layout().setSupportedInterface(
            type(IERC165).interfaceId,
            true
        );
        ERC165Storage.layout().setSupportedInterface(
            type(IERC721).interfaceId,
            true
        );
    }

    function mint(address account, uint256 tokenId) external {
        _mint(account, tokenId);
    }

    function burn(uint256 tokenId) external {
        _burn(tokenId);
    }
}
