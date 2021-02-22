// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './GovernorAlphaTypes.sol';

library GovernorAlphaStorage {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.GovernorAlpha'
  );

  struct Layout {
    // params
    uint quorumVotes;
    uint proposalThreshold;
    uint proposalMaxOperations;
    uint votingDelay;
    uint votingPeriod;

    address timelock;
    address govtoken;
    address guardian;

    uint proposalCount;

    mapping (uint => Proposal) proposals;
    mapping (uint => mapping(address => Receipt)) receipts;
    mapping (address => uint) latestProposalIds;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }

  function getProposal (
    Layout storage l,
    uint proposalId
  ) internal view returns (Proposal storage) {
    return l.proposals[proposalId];
  }

  function getReceipt (
    Layout storage l,
    uint proposalId,
    address voter
  ) internal view returns (Receipt storage) {
    return l.receipts[proposalId][voter];
  }

  function setQuorumVotes (
    Layout storage l,
    uint quorumVotes
  ) internal {
    l.quorumVotes = quorumVotes;
  }

  function setProposalThreshold (
    Layout storage l,
    uint proposalThreshold
  ) internal {
    l.proposalThreshold = proposalThreshold;
  }

  function setProposalMaxOperations (
    Layout storage l,
    uint proposalMaxOperations
  ) internal {
    l.proposalMaxOperations = proposalMaxOperations;
  }

  function setVotingDelay (
    Layout storage l,
    uint votingDelay
  ) internal {
    l.votingDelay = votingDelay;
  }

  function setVotingPeriod (
    Layout storage l,
    uint votingPeriod
  ) internal {
    l.votingPeriod = votingPeriod;
  }

  function setTimelock (
    Layout storage l,
    address timelock
  ) internal {
    l.timelock = timelock;
  }

  function setGovToken (
    Layout storage l,
    address govtoken
  ) internal {
    l.govtoken = govtoken;
  }

  function setGuardian (
    Layout storage l,
    address guardian
  ) internal {
    l.guardian = guardian;
  }
  
}
