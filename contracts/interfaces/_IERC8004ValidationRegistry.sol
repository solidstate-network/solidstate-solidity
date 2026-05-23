// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

/**
 * @title Partial ERC8004 Validation Registry interface needed by internal functions
 */
interface _IERC8004ValidationRegistry {
    event ValidationRequest(
        address indexed validatorAddress,
        uint256 indexed agentId,
        string requestURI,
        bytes32 indexed requestHash
    );

    event ValidationResponse(
        address indexed validatorAddress,
        uint256 indexed agentId,
        bytes32 indexed requestHash,
        uint8 response,
        string responseURI,
        bytes32 responseHash,
        string tag
    );
}
