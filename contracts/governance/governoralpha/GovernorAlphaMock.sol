// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v2;

import './GovernorAlpha.sol';

contract GovernorAlphaMock is GovernorAlpha {
    using GovernorAlphaStorage for GovernorAlphaStorage.Layout;

    constructor(
        uint256 quorumVotes,
        uint256 proposalThreshold,
        uint256 proposalMaxOperations,
        uint256 votingDelay,
        uint256 votingPeriod,
        address timelock,
        address govtoken,
        address guardian
    ) {
        GovernorAlphaStorage.Layout storage l = GovernorAlphaStorage.layout();

        l.setQuorumVotes(quorumVotes);
        l.setProposalThreshold(proposalThreshold);
        l.setProposalMaxOperations(proposalMaxOperations);
        l.setVotingDelay(votingDelay);
        l.setVotingPeriod(votingPeriod);
        l.setTimelock(timelock);
        l.setGovToken(govtoken);
        l.setGuardian(guardian);
    }
}
