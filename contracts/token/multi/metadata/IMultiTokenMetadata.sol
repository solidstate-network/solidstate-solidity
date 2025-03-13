// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IMultiTokenMetadata } from './_IMultiTokenMetadata.sol';

/**
 * @title MultiTokenMetadata interface
 */
interface IMultiTokenMetadata is _IMultiTokenMetadata {
    /**
     * @notice get generated URI for given token
     * @return token URI
     */
    function uri(uint256 tokenId) external view returns (string memory);
}
