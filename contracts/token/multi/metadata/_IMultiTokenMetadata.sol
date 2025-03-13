// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Partial MultiTokenMetadata interface needed by internal functions
 */
interface _IMultiTokenMetadata {
    event URI(string value, uint256 indexed tokenId);
}
