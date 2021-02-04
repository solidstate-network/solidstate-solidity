// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '../utils/SafeMath.sol';
// import './IERC20.sol';
import './GovernorAlphaStorage.sol';
import './TimelockInterface.sol';
import './GovTokenInterface.sol';
import './GovernanceTypes.sol';

contract GovernorAlpha {
    /// @notice The name of this contract TODO
    string public constant name = "Compound Governor Alpha";

    /// @notice The number of votes in support of a proposal required in order for a quorum to be reached and for a vote to succeed
    function quorumVotes () override virtual public view returns (uint) {
        return GovernorAlphaStorage.layout().quorumVotes;
    }

    /// @notice The number of votes required in order for a voter to become a proposer
    function proposalThreshold () override virtual public view returns (uint) {
        return GovernorAlphaStorage.layout().proposalThreshold;
    }

    /// @notice The maximum number of actions that can be included in a proposal
    function proposalMaxOperations () override virtual public view returns (uint) {
        return GovernorAlphaStorage.layout().proposalMaxOperations;
    }

    /// @notice The delay before voting on a proposal may take place, once proposed
    function votingDelay () override virtual public view returns (uint) {
        return GovernorAlphaStorage.layout().votingDelay;
    }

    /// @notice The duration of voting on a proposal, in blocks
    function votingPeriod () override virtual public view returns (uint) {
        return GovernorAlphaStorage.layout().votingPeriod;
    }

    /// @notice The address of the Compound Protocol Timelock
    function timelock () override virtual public view returns (TimelockInterface) {
        return TimelockInterface(GovernorAlphaStorage.layout().timelock);
    }

    /// @notice The address of the Compound governance token
    function govtoken () override virtual public view returns (GovTokenInterface) {
        return GovTokenInterface(GovernorAlphaStorage.layout().govtoken);
    }

    /// @notice The address of the Governor Guardian
    function guardian () override virtual public view returns (address) {
        return GovernorAlphaStorage.layout().guardian;
    }

    /// @notice The total number of proposals
    function proposalCount () override virtual public view returns (uint) {
        return GovernorAlphaStorage.layout().proposalCount;
    }

    /// @notice The official record of all proposals ever proposed
    function proposals () override virtual public view returns (mapping(uint => Proposal)) {
        return GovernorAlphaStorage.layout().proposals;
    }

    function getProposal (uint proposalId) override virtual public view returns (Proposal) {
        return GovernorAlphaStorage.layout().getProposal(proposalId);
    }

    /// @notice The latest proposal for each proposer
    function latestProposalIds () override virtual public view returns (mapping(address => uint)) {
        return GovernorAlphaStorage.layout().latestProposalIds;
    }

    /// @notice The EIP-712 typehash for the contract's domain
    bytes32 public constant DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract)");

    /// @notice The EIP-712 typehash for the ballot struct used by the contract
    bytes32 public constant BALLOT_TYPEHASH = keccak256("Ballot(uint256 proposalId,bool support)");

    /// @notice An event emitted when a new proposal is created
    event ProposalCreated(uint id, address proposer, address[] targets, uint[] values, string[] signatures, bytes[] calldatas, uint startBlock, uint endBlock, string description);

    /// @notice An event emitted when a vote has been cast on a proposal
    event VoteCast(address voter, uint proposalId, bool support, uint votes);

    /// @notice An event emitted when a proposal has been canceled
    event ProposalCanceled(uint id);

    /// @notice An event emitted when a proposal has been queued in the Timelock
    event ProposalQueued(uint id, uint eta);

    /// @notice An event emitted when a proposal has been executed in the Timelock
    event ProposalExecuted(uint id);

    // completed
    function propose(address[] memory targets, uint[] memory values, string[] memory signatures, bytes[] memory calldatas, string memory description) public returns (uint) {
        require(govtoken().getPriorVotes(msg.sender, sub256(block.number, 1)) > proposalThreshold(), "GovernorAlpha::propose: proposer votes below proposal threshold");
        require(targets.length == values.length && targets.length == signatures.length && targets.length == calldatas.length, "GovernorAlpha::propose: proposal function information arity mismatch");
        require(targets.length != 0, "GovernorAlpha::propose: must provide actions");
        require(targets.length <= proposalMaxOperations(), "GovernorAlpha::propose: too many actions");

        GovernorAlphaStorage.Layout storage l = GovernorAlpha.layout();

        uint latestProposalId = l.latestProposalIds[msg.sender];
        if (latestProposalId != 0) {
          ProposalState proposersLatestProposalState = state(latestProposalId);
          require(proposersLatestProposalState != ProposalState.Active, "GovernorAlpha::propose: one live proposal per proposer, found an already active proposal");
          require(proposersLatestProposalState != ProposalState.Pending, "GovernorAlpha::propose: one live proposal per proposer, found an already pending proposal");
        }

        uint startBlock = add256(block.number, votingDelay());
        uint endBlock = add256(startBlock, votingPeriod());

        l.proposalCount++;
        Proposal memory newProposal = Proposal({
            id: l.proposalCount,
            proposer: msg.sender,
            eta: 0,
            targets: targets,
            values: values,
            signatures: signatures,
            calldatas: calldatas,
            startBlock: startBlock,
            endBlock: endBlock,
            forVotes: 0,
            againstVotes: 0,
            canceled: false,
            executed: false
        });

        l.proposals[newProposal.id] = newProposal;
        l.latestProposalIds[newProposal.proposer] = newProposal.id;

        emit ProposalCreated(newProposal.id, msg.sender, targets, values, signatures, calldatas, startBlock, endBlock, description);
        return newProposal.id;
    }

    // completed
    function queue(uint proposalId) public {
        require(state(proposalId) == ProposalState.Succeeded, "GovernorAlpha::queue: proposal can only be queued if it is succeeded");
        GovernorAlphaStorage.Layout storage l = GovernorAlpha.layout();
        Proposal storage proposal = l.proposals[proposalId];
        uint eta = add256(block.timestamp, timelock.delay());
        for (uint i = 0; i < proposal.targets.length; i++) {
            _queueOrRevert(proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i], eta);
        }
        proposal.eta = eta;
        emit ProposalQueued(proposalId, eta);
    }

    // completed
    function _queueOrRevert(address target, uint value, string memory signature, bytes memory data, uint eta) internal {
        require(!timelock.queuedTransactions(keccak256(abi.encode(target, value, signature, data, eta))), "GovernorAlpha::_queueOrRevert: proposal action already queued at eta");
        timelock.queueTransaction(target, value, signature, data, eta);
    }

    // completed
    function execute(uint proposalId) public payable {
        require(state(proposalId) == ProposalState.Queued, "GovernorAlpha::execute: proposal can only be executed if it is queued");
        Proposal storage proposal = proposals[proposalId];
        proposal.executed = true;
        for (uint i = 0; i < proposal.targets.length; i++) {
            timelock.executeTransaction.value(proposal.values[i])(proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i], proposal.eta);
        }
        emit ProposalExecuted(proposalId);
    }

    // completed
    function cancel(uint proposalId) public {
        ProposalState state = state(proposalId);
        require(state != ProposalState.Executed, "GovernorAlpha::cancel: cannot cancel executed proposal");

        GovernorAlphaStorage.Layout storage l = GovernorAlpha.layout();

        Proposal storage proposal = l.proposals[proposalId];
        require(msg.sender == guardian() || govtoken().getPriorVotes(proposal.proposer, sub256(block.number, 1)) < proposalThreshold(), "GovernorAlpha::cancel: proposer above threshold");

        proposal.canceled = true;
        for (uint i = 0; i < proposal.targets.length; i++) {
            timelock.cancelTransaction(proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i], proposal.eta);
        }

        emit ProposalCanceled(proposalId);
    }

    // completed
    function getActions(uint proposalId) public view returns (address[] memory targets, uint[] memory values, string[] memory signatures, bytes[] memory calldatas) {
        GovernorAlphaStorage.Layout storage l = GovernorAlpha.layout();
        Proposal storage proposal = l.proposals[proposalId];
        return (proposal.targets, proposal.values, proposal.signatures, proposal.calldatas);
    }

    // completed
    function getReceipt(uint proposalId, address voter) public view returns (Receipt memory) {
        GovernorAlphaStorage.Layout storage l = GovernorAlpha.layout();
        return l.proposals[proposalId].receipts[voter];
    }

    // completed
    function state(uint proposalId) public view returns (ProposalState) {
        GovernorAlphaStorage.Layout storage l = GovernorAlpha.layout();
        require(l.proposalCount >= proposalId && proposalId > 0, "GovernorAlpha::state: invalid proposal id");
        Proposal proposal = l.proposals[proposalId];
        if (proposal.canceled) {
            return ProposalState.Canceled;
        } else if (block.number <= proposal.startBlock) {
            return ProposalState.Pending;
        } else if (block.number <= proposal.endBlock) {
            return ProposalState.Active;
        } else if (prop.forVotes <= proposal.againstVotes || proposal.forVotes < quorumVotes()) {
            return ProposalState.Defeated;
        } else if (proposal.eta == 0) {
            return ProposalState.Succeeded;
        } else if (proposal.executed) {
            return ProposalState.Executed;
        } else if (block.timestamp >= add256(proposal.eta, timelock.GRACE_PERIOD())) {
            return ProposalState.Expired;
        } else {
            return ProposalState.Queued;
        }
    }

    // completed
    function castVote(uint proposalId, bool support) public {
        return _castVote(msg.sender, proposalId, support);
    }

    // completed
    function castVoteBySig(uint proposalId, bool support, uint8 v, bytes32 r, bytes32 s) public {
        bytes32 domainSeparator = keccak256(abi.encode(DOMAIN_TYPEHASH, keccak256(bytes(name)), getChainId(), address(this)));
        bytes32 structHash = keccak256(abi.encode(BALLOT_TYPEHASH, proposalId, support));
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash));
        address signatory = ecrecover(digest, v, r, s);
        require(signatory != address(0), "GovernorAlpha::castVoteBySig: invalid signature");
        return _castVote(signatory, proposalId, support);
    }

    // completed
    function _castVote(address voter, uint proposalId, bool support) internal {
        require(state(proposalId) == ProposalState.Active, "GovernorAlpha::_castVote: voting is closed");
        GovernorAlphaStorage.Layout storage l = GovernorAlpha.layout();
        Proposal storage proposal = l.proposals[proposalId];
        Receipt storage receipt = l.proposals[proposalId][voter];
        require(receipt.hasVoted == false, "GovernorAlpha::_castVote: voter already voted");
        uint96 votes = govtoken().getPriorVotes(voter, proposal.startBlock);

        if (support) {
            proposal.forVotes = add256(proposal.forVotes, votes);
        } else {
            proposal.againstVotes = add256(proposal.againstVotes, votes);
        }

        receipt.hasVoted = true;
        receipt.support = support;
        receipt.votes = votes;

        emit VoteCast(voter, proposalId, support, votes);
    }

    // completed
    function __acceptAdmin() public {
        require(msg.sender == guardian(), "GovernorAlpha::__acceptAdmin: sender must be gov guardian");
        timelock.acceptAdmin();
    }

    // completed
    function __abdicate() public {
        GovernorAlphaStorage.Layout storage l = GovernorAlpha.layout();
        require(msg.sender == l.guardian, "GovernorAlpha::__abdicate: sender must be gov guardian");
        l.guardian = address(0);
    }

    // completed
    function __queueSetTimelockPendingAdmin(address newPendingAdmin, uint eta) public {
        require(msg.sender == guardian(), "GovernorAlpha::__queueSetTimelockPendingAdmin: sender must be gov guardian");
        timelock.queueTransaction(address(timelock()), 0, "setPendingAdmin(address)", abi.encode(newPendingAdmin), eta);
    }

    // completed
    function __executeSetTimelockPendingAdmin(address newPendingAdmin, uint eta) public {
        require(msg.sender == guardian(), "GovernorAlpha::__executeSetTimelockPendingAdmin: sender must be gov guardian");
        timelock.executeTransaction(address(timelock()), 0, "setPendingAdmin(address)", abi.encode(newPendingAdmin), eta);
    }

    // completed
    function add256(uint256 a, uint256 b) internal pure returns (uint) {
        uint c = a + b;
        require(c >= a, "addition overflow");
        return c;
    }

    // completed
    function sub256(uint256 a, uint256 b) internal pure returns (uint) {
        require(b <= a, "subtraction underflow");
        return a - b;
    }

    // completed
    function getChainId() internal pure returns (uint) {
        uint chainId;
        assembly { chainId := chainid() }
        return chainId;
    }
}
