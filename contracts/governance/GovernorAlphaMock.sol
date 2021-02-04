pragma solidity ^0.7.0;
pragma abicoder v2;

import './GovernorAlpha.sol';

contract GovernorAlphaMock is GovernorAlpha {
  using GovernorAlphaStorage for GovernorAlphaStorage.Layout;

  constructor (
    uint quorumVotes,
    uint proposalThreshold,
    uint proposalMaxOperations,
    uint votingDelay,
    uint votingPeriod,
    address timelock,
    address govtoken,
    address guardian
  ) {
    GovernorAlphaStorage.Layout storage l = GovernorAlphaStorage.layout();

    l.setQuorumVotes(quorum);
    l.setProposalThreshold(proposalThreshold);
    l.setProposalMaxOperations(proposalMaxOperations);
    l.setVotingDelay(votingDelay);
    l.setVotingPeriod(votingPeriod);
    l.setTimelock(timelock);
    l.setGovToken(govtoken);
    l.setGuardian(guardian);
  }
}
