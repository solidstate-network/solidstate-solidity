// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC8004IdentityRegistry } from './_IERC8004IdentityRegistry.sol';
import { IERC721 } from './IERC721.sol';
import { IERC721Metadata } from './IERC721Metadata.sol';

/**
 * @title ERC8004 Identity Registry interface
 * @dev see https://eips.ethereum.org/EIPS/eip-8004
 */
interface IERC8004IdentityRegistry is
    _IERC8004IdentityRegistry,
    IERC721,
    IERC721Metadata
{
    /**
     * @notice register a new agent identity
     * @return agentId id of newly registered agent
     */
    function register() external returns (uint256 agentId);

    /**
     * @notice register a new agent identity with a URI
     * @param agentURI URI pointing to agent registration file
     * @return agentId id of newly registered agent
     */
    function register(
        string calldata agentURI
    ) external returns (uint256 agentId);

    /**
     * @notice register a new agent identity with a URI and metadata entries
     * @param agentURI URI pointing to agent registration file
     * @param metadata array of key-value metadata entries to set
     * @return agentId id of newly registered agent
     */
    function register(
        string calldata agentURI,
        MetadataEntry[] calldata metadata
    ) external returns (uint256 agentId);

    /**
     * @notice query metadata value for given agent and key
     * @param agentId agent to query
     * @param metadataKey metadata key to look up
     * @return metadataValue raw metadata bytes
     */
    function getMetadata(
        uint256 agentId,
        string calldata metadataKey
    ) external view returns (bytes memory metadataValue);

    /**
     * @notice set metadata value for given agent and key
     * @param agentId agent to update
     * @param metadataKey metadata key to set
     * @param metadataValue raw metadata bytes to store
     */
    function setMetadata(
        uint256 agentId,
        string calldata metadataKey,
        bytes calldata metadataValue
    ) external;

    /**
     * @notice update the URI for a given agent
     * @param agentId agent to update
     * @param newURI new URI to set
     */
    function setAgentURI(uint256 agentId, string calldata newURI) external;

    /**
     * @notice query the wallet address bound to a given agent
     * @param agentId agent to query
     * @return wallet address bound to agent
     */
    function getAgentWallet(
        uint256 agentId
    ) external view returns (address wallet);

    /**
     * @notice bind a new wallet address to a given agent with EIP-712 signature verification
     * @param agentId agent to update
     * @param newWallet wallet address to bind
     * @param deadline signature expiration timestamp
     * @param signature EIP-712 or ERC-1271 signature from new wallet
     */
    function setAgentWallet(
        uint256 agentId,
        address newWallet,
        uint256 deadline,
        bytes calldata signature
    ) external;

    /**
     * @notice remove the wallet address bound to a given agent
     * @param agentId agent to unbind wallet from
     */
    function unsetAgentWallet(uint256 agentId) external;
}
