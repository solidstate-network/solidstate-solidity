// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { _IERC8004ValidationRegistry } from './_IERC8004ValidationRegistry.sol';

/**
 * @title ERC8004 Validation Registry interface
 * @dev see https://eips.ethereum.org/EIPS/eip-8004
 */
interface IERC8004ValidationRegistry is _IERC8004ValidationRegistry {
    /**
     * @notice get address of associated identity registry
     * @return identityRegistry address of identity registry
     */
    function getIdentityRegistry()
        external
        view
        returns (address identityRegistry);

    /**
     * @notice request validation of agent work from a validator
     * @param validatorAddress address of validator smart contract
     * @param agentId agent to validate
     * @param requestURI URI pointing to off-chain validation request data
     * @param requestHash KECCAK-256 hash of request payload
     */
    function validationRequest(
        address validatorAddress,
        uint256 agentId,
        string calldata requestURI,
        bytes32 requestHash
    ) external;

    /**
     * @notice submit validation response for a given request
     * @param requestHash hash of original validation request
     * @param response validation outcome (0-100)
     * @param responseURI optional URI pointing to off-chain validation evidence
     * @param responseHash KECCAK-256 hash of response payload
     * @param tag optional categorization tag
     */
    function validationResponse(
        bytes32 requestHash,
        uint8 response,
        string calldata responseURI,
        bytes32 responseHash,
        string calldata tag
    ) external;

    /**
     * @notice read validation status for a given request
     * @param requestHash hash of validation request
     * @return validatorAddress address of assigned validator
     * @return agentId agent that was validated
     * @return response validation outcome
     * @return responseHash hash of response payload
     * @return tag categorization tag
     * @return lastUpdate timestamp of last response update
     */
    function getValidationStatus(
        bytes32 requestHash
    )
        external
        view
        returns (
            address validatorAddress,
            uint256 agentId,
            uint8 response,
            bytes32 responseHash,
            string memory tag,
            uint256 lastUpdate
        );

    /**
     * @notice get aggregated validation summary for an agent
     * @param agentId agent to summarize
     * @param validatorAddresses optional validator filter
     * @param tag optional tag filter
     * @return count number of validation responses included
     * @return averageResponse average validation outcome
     */
    function getSummary(
        uint256 agentId,
        address[] calldata validatorAddresses,
        string calldata tag
    ) external view returns (uint64 count, uint8 averageResponse);

    /**
     * @notice get all validation request hashes for a given agent
     * @param agentId agent to query
     * @return requestHashes list of validation request hashes
     */
    function getAgentValidations(
        uint256 agentId
    ) external view returns (bytes32[] memory requestHashes);

    /**
     * @notice get all validation request hashes for a given validator
     * @param validatorAddress validator to query
     * @return requestHashes list of validation request hashes
     */
    function getValidatorRequests(
        address validatorAddress
    ) external view returns (bytes32[] memory requestHashes);
}
