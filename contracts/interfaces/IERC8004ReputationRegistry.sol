// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { _IERC8004ReputationRegistry } from './_IERC8004ReputationRegistry.sol';

/**
 * @title ERC8004 Reputation Registry interface
 * @dev see https://eips.ethereum.org/EIPS/eip-8004
 */
interface IERC8004ReputationRegistry is _IERC8004ReputationRegistry {
    /**
     * @notice get address of associated identity registry
     * @return identityRegistry address of identity registry
     */
    function getIdentityRegistry()
        external
        view
        returns (address identityRegistry);

    /**
     * @notice submit feedback for a given agent
     * @param agentId agent to rate
     * @param value fixed-point feedback value
     * @param valueDecimals decimal places of value
     * @param tag1 optional categorization tag
     * @param tag2 optional secondary categorization tag
     * @param endpoint optional endpoint URI
     * @param feedbackURI optional URI pointing to off-chain feedback details
     * @param feedbackHash KECCAK-256 hash of feedback file content
     */
    function giveFeedback(
        uint256 agentId,
        int128 value,
        uint8 valueDecimals,
        string calldata tag1,
        string calldata tag2,
        string calldata endpoint,
        string calldata feedbackURI,
        bytes32 feedbackHash
    ) external;

    /**
     * @notice revoke previously submitted feedback
     * @param agentId agent whose feedback to revoke
     * @param feedbackIndex index of feedback to revoke
     */
    function revokeFeedback(uint256 agentId, uint64 feedbackIndex) external;

    /**
     * @notice append a response to existing feedback
     * @param agentId agent whose feedback to respond to
     * @param clientAddress author of original feedback
     * @param feedbackIndex index of feedback to respond to
     * @param responseURI optional URI pointing to off-chain response details
     * @param responseHash KECCAK-256 hash of response file content
     */
    function appendResponse(
        uint256 agentId,
        address clientAddress,
        uint64 feedbackIndex,
        string calldata responseURI,
        bytes32 responseHash
    ) external;

    /**
     * @notice get aggregated feedback summary for given agent and clients
     * @param agentId agent to summarize
     * @param clientAddresses reviewers to include in summary
     * @param tag1 optional tag filter
     * @param tag2 optional secondary tag filter
     * @return count number of feedback entries included
     * @return summaryValue aggregated feedback value
     * @return summaryValueDecimals decimal places of aggregated value
     */
    function getSummary(
        uint256 agentId,
        address[] calldata clientAddresses,
        string calldata tag1,
        string calldata tag2
    )
        external
        view
        returns (uint64 count, int128 summaryValue, uint8 summaryValueDecimals);

    /**
     * @notice read a single feedback entry
     * @param agentId agent to query
     * @param clientAddress author of feedback
     * @param feedbackIndex index of feedback to read
     * @return value feedback value
     * @return valueDecimals decimal places of value
     * @return tag1 categorization tag
     * @return tag2 secondary categorization tag
     * @return isRevoked whether feedback has been revoked
     */
    function readFeedback(
        uint256 agentId,
        address clientAddress,
        uint64 feedbackIndex
    )
        external
        view
        returns (
            int128 value,
            uint8 valueDecimals,
            string memory tag1,
            string memory tag2,
            bool isRevoked
        );

    /**
     * @notice read all feedback entries for given agent with optional filters
     * @param agentId agent to query
     * @param clientAddresses optional reviewer filter
     * @param tag1 optional tag filter
     * @param tag2 optional secondary tag filter
     * @param includeRevoked whether to include revoked feedback
     * @return clients addresses of feedback authors
     * @return feedbackIndexes indices of feedback entries
     * @return values feedback values
     * @return valueDecimals decimal places of values
     * @return tag1s categorization tags
     * @return tag2s secondary categorization tags
     * @return revokedStatuses revocation statuses
     */
    function readAllFeedback(
        uint256 agentId,
        address[] calldata clientAddresses,
        string calldata tag1,
        string calldata tag2,
        bool includeRevoked
    )
        external
        view
        returns (
            address[] memory clients,
            uint64[] memory feedbackIndexes,
            int128[] memory values,
            uint8[] memory valueDecimals,
            string[] memory tag1s,
            string[] memory tag2s,
            bool[] memory revokedStatuses
        );

    /**
     * @notice get number of responses appended to a feedback entry
     * @param agentId agent to query
     * @param clientAddress author of original feedback
     * @param feedbackIndex index of feedback entry
     * @param responders optional responder filter
     * @return count number of responses
     */
    function getResponseCount(
        uint256 agentId,
        address clientAddress,
        uint64 feedbackIndex,
        address[] calldata responders
    ) external view returns (uint64 count);

    /**
     * @notice get list of clients who have submitted feedback for an agent
     * @param agentId agent to query
     * @return clients addresses of feedback authors
     */
    function getClients(
        uint256 agentId
    ) external view returns (address[] memory clients);

    /**
     * @notice get highest feedback index for a given client and agent
     * @param agentId agent to query
     * @param clientAddress client to query
     * @return lastIndex highest feedback index
     */
    function getLastIndex(
        uint256 agentId,
        address clientAddress
    ) external view returns (uint64 lastIndex);
}
