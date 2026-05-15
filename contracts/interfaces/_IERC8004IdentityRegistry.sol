// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC721 } from './_IERC721.sol';
import { _IERC721Metadata } from './_IERC721Metadata.sol';

/**
 * @title Partial ERC8004 Identity Registry interface needed by internal functions
 */
interface _IERC8004IdentityRegistry is _IERC721, _IERC721Metadata {
    struct MetadataEntry {
        string metadataKey;
        bytes metadataValue;
    }

    event Registered(
        uint256 indexed agentId,
        string agentURI,
        address indexed owner
    );

    event MetadataSet(
        uint256 indexed agentId,
        string indexed indexedMetadataKey,
        string metadataKey,
        bytes metadataValue
    );

    event URIUpdated(
        uint256 indexed agentId,
        string newURI,
        address indexed updatedBy
    );
}
