// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC5267 } from '../interfaces/IERC5267.sol';
import { TransientReentrancyGuard } from '../access/reentrancy_guard/TransientReentrancyGuard.sol';
import { _TransientReentrancyGuard } from '../access/reentrancy_guard/_TransientReentrancyGuard.sol';
import { Context } from './Context.sol';
import { _Context } from './_Context.sol';
import { IECDSAMetaTransactionContext } from './IECDSAMetaTransactionContext.sol';
import { _ECDSAMetaTransactionContext } from './_ECDSAMetaTransactionContext.sol';

abstract contract ECDSAMetaTransactionContext is
    IECDSAMetaTransactionContext,
    _ECDSAMetaTransactionContext,
    Context,
    TransientReentrancyGuard
{
    /**
     * @inheritdoc IERC5267
     */
    function eip712Domain()
        external
        view
        returns (
            bytes1 fields,
            string memory name,
            string memory version,
            uint256 chainId,
            address verifyingContract,
            bytes32 salt,
            uint256[] memory extensions
        )
    {
        return _eip712Domain();
    }

    function _msgSender()
        internal
        override(_Context, _ECDSAMetaTransactionContext)
        returns (address msgSender)
    {
        msgSender = super._msgSender();
    }

    function _msgData()
        internal
        override(_Context, _ECDSAMetaTransactionContext)
        returns (bytes calldata msgData)
    {
        msgData = super._msgData();
    }

    function _calldataSuffixLength()
        internal
        view
        override(_Context, _ECDSAMetaTransactionContext)
        returns (uint256 length)
    {
        length = super._calldataSuffixLength();
    }

    function _isReentrancyGuardLocked()
        internal
        view
        virtual
        override(_TransientReentrancyGuard, TransientReentrancyGuard)
        returns (bool status)
    {
        status = super._isReentrancyGuardLocked();
    }

    function _lockReentrancyGuard()
        internal
        virtual
        override(TransientReentrancyGuard, _ECDSAMetaTransactionContext)
    {
        super._lockReentrancyGuard();
    }

    function _unlockReentrancyGuard()
        internal
        virtual
        override(_TransientReentrancyGuard, TransientReentrancyGuard)
    {
        super._unlockReentrancyGuard();
    }
}
