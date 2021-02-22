// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "../token/ERC20/ERC20Base.sol";
import "../token/ERC20/ERC20Metadata.sol";
import "./GovTokenStorage.sol";
import "./GovTokenTypes.sol";

contract GovToken is ERC20Metadata {
    
    // /// @notice A record of each accounts delegate
    // function delegates () override virtual public view returns (mapping (address => address)) {
    //     return GovTokenStorage.layout().delegates;
    // }

    // /// @notice A record of votes checkpoints for each account, by index
    // function checkpoints () override virtual public view returns (mapping (address => mapping (uint32 => Checkpoint))) {
    //     return GovTokenStorage.layout().checkpoints;
    // }

    // /// @notice The number of checkpoints for each account
    // function numCheckpoints () override virtual public view returns (mapping (address => uint32)) {
    //     return GovTokenStorage.layout().numCheckpoints;
    // }

    /// @notice The EIP-712 typehash for the contract's domain
    bytes32 public constant DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract)");

    /// @notice The EIP-712 typehash for the delegation struct used by the contract
    bytes32 public constant DELEGATION_TYPEHASH = keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");

    // /// @notice A record of states for signing / validating signatures
    // function nonces () override virtual public view returns (mapping (address => uint)) {
    //     return GovTokenStorage.layout().nonces;
    // }

    /// @notice An event thats emitted when an account changes its delegate
    event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);

    /// @notice An event thats emitted when a delegate account's vote balance changes
    event DelegateVotesChanged(address indexed delegate, uint previousBalance, uint newBalance);

    /**
     * @notice Delegate votes from `msg.sender` to `delegatee`
     * @param delegatee The address to delegate votes to
     */
    function delegate(address delegatee) public {
        return _delegate(msg.sender, delegatee);
    }

    // /**
    //  * @notice Delegates votes from signatory to `delegatee`
    //  * @param delegatee The address to delegate votes to
    //  * @param nonce The contract state required to match the signature
    //  * @param expiry The time at which to expire the signature
    //  * @param v The recovery byte of the signature
    //  * @param r Half of the ECDSA signature pair
    //  * @param s Half of the ECDSA signature pair
    //  */
    // function delegateBySig(address delegatee, uint nonce, uint expiry, uint8 v, bytes32 r, bytes32 s) public {
    //     bytes32 domainSeparator = keccak256(abi.encode(DOMAIN_TYPEHASH, keccak256(bytes(name())), getChainId(), address(this)));
    //     bytes32 structHash = keccak256(abi.encode(DELEGATION_TYPEHASH, delegatee, nonce, expiry));
    //     bytes32 digest = keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash));
    //     address signatory = ecrecover(digest, v, r, s);
    //     require(signatory != address(0), string(abi.encodePacked(name(), "::delegateBySig: invalid signature")));

    //     GovTokenStorage.Layout storage l = GovTokenStorage.layout();

    //     require(nonce == l.nonces[signatory]++, string(abi.encodePacked(name(), "::delegateBySig: invalid nonce")));
    //     require(block.timestamp <= expiry, string(abi.encodePacked(name(), "::delegateBySig: signature expired")));
    //     return _delegate(signatory, delegatee);
    // }

    /**
     * @notice Gets the current votes balance for `account`
     * @param account The address to get votes balance
     * @return The number of current votes for `account`
     */
    function getCurrentVotes(address account) external view returns (uint) {
        GovTokenStorage.Layout storage l = GovTokenStorage.layout();        
        uint32 nCheckpoints = l.numCheckpoints[account];
        return nCheckpoints > 0 ? l.checkpoints[account][nCheckpoints - 1].votes : 0;
    }

    /**
     * @notice Determine the prior number of votes for an account as of a block number
     * @dev Block number must be a finalized block or else this function will revert to prevent misinformation.
     * @param account The address of the account to check
     * @param blockNumber The block number to get the vote balance at
     * @return The number of votes the account had as of the given block
     */
    function getPriorVotes(address account, uint blockNumber) public view returns (uint) {
        require(blockNumber < block.number, string(abi.encodePacked(name(), string(abi.encodePacked(name(), "::getPriorVotes: not yet determined")))));

        GovTokenStorage.Layout storage l = GovTokenStorage.layout();

        uint32 nCheckpoints = l.numCheckpoints[account];
        if (nCheckpoints == 0) {
            return 0;
        }

        // First check most recent balance
        if (l.checkpoints[account][nCheckpoints - 1].fromBlock <= blockNumber) {
            return l.checkpoints[account][nCheckpoints - 1].votes;
        }

        // Next check implicit zero balance
        if (l.checkpoints[account][0].fromBlock > blockNumber) {
            return 0;
        }

        uint32 lower = 0;
        uint32 upper = nCheckpoints - 1;
        while (upper > lower) {
            uint32 center = upper - (upper - lower) / 2; // ceil, avoiding overflow
            Checkpoint memory cp = l.checkpoints[account][center];
            if (cp.fromBlock == blockNumber) {
                return cp.votes;
            } else if (cp.fromBlock < blockNumber) {
                lower = center;
            } else {
                upper = center - 1;
            }
        }
        return l.checkpoints[account][lower].votes;
    }

    function _delegate(address delegator, address delegatee) internal {
        GovTokenStorage.Layout storage l = GovTokenStorage.layout();
        address currentDelegate = l.delegates[delegator];
        uint delegatorBalance = ERC20Base(this).balanceOf(delegator);
        
        l.delegates[delegator] = delegatee;

        emit DelegateChanged(delegator, currentDelegate, delegatee);

        _moveDelegates(currentDelegate, delegatee, delegatorBalance);
    }

    function _moveDelegates(address srcRep, address dstRep, uint amount) internal {
        GovTokenStorage.Layout storage l = GovTokenStorage.layout();
        
        if (srcRep != dstRep && amount > 0) {
            if (srcRep != address(0)) {
                uint32 srcRepNum = l.numCheckpoints[srcRep];
                uint srcRepOld = srcRepNum > 0 ? l.checkpoints[srcRep][srcRepNum - 1].votes : 0;
                uint srcRepNew = srcRepOld - amount;
                _writeCheckpoint(srcRep, srcRepNum, srcRepOld, srcRepNew);
            }

            if (dstRep != address(0)) {
                uint32 dstRepNum = l.numCheckpoints[dstRep];
                uint dstRepOld = dstRepNum > 0 ? l.checkpoints[dstRep][dstRepNum - 1].votes : 0;
                uint dstRepNew = dstRepOld + amount;
                _writeCheckpoint(dstRep, dstRepNum, dstRepOld, dstRepNew);
            }
        }
    }

    function _writeCheckpoint(address delegatee, uint32 nCheckpoints, uint oldVotes, uint newVotes) internal {
        uint32 blockNumber = safe32(block.number, string(abi.encodePacked(name(), "::_writeCheckpoint: block number exceeds 32 bits")));

        GovTokenStorage.Layout storage l = GovTokenStorage.layout();

        if (nCheckpoints > 0 && l.checkpoints[delegatee][nCheckpoints - 1].fromBlock == blockNumber) {
            l.checkpoints[delegatee][nCheckpoints - 1].votes = newVotes;
        } else {
            l.checkpoints[delegatee][nCheckpoints] = Checkpoint(blockNumber, newVotes);
            l.numCheckpoints[delegatee] = nCheckpoints + 1;
        }

        emit DelegateVotesChanged(delegatee, oldVotes, newVotes);
    }

    // function getChainId() internal pure returns (uint) {
    //     uint256 chainId;
    //     assembly { chainId := chainid() }
    //     return chainId;
    // }

    /**
    * @notice ERC20 hook: update snapshot data
    * @inheritdoc ERC20Base
    */
    function _beforeTokenTransfer (
        address from,
        address to,
        uint amount
    ) virtual override internal {
        super._beforeTokenTransfer(from, to, amount);

        GovTokenStorage.Layout storage l = GovTokenStorage.layout();

        _moveDelegates(l.delegates[from], l.delegates[to], amount);
    }

    function safe32(uint n, string memory errorMessage) internal pure returns (uint32) {
        require(n < 2**32, errorMessage);
        return uint32(n);
    }
}
