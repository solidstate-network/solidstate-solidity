// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ERC1155Metadata, ERC1155MetadataStorage } from './ERC1155Metadata.sol';
import { ERC165 } from '../../../introspection/ERC165.sol';

contract ERC1155MetadataMock is ERC1155Metadata, ERC165 {
    constructor(string memory baseURI) {
        ERC1155MetadataStorage.Layout storage l = ERC1155MetadataStorage
            .layout();
        l.baseURI = baseURI;
    }
}
