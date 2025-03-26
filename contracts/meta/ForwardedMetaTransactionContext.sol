// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC2771 } from '../interfaces/IERC2771.sol';
import { Context } from './Context.sol';
import { _Context } from './_Context.sol';
import { IForwardedMetaTransactionContext } from './IForwardedMetaTransactionContext.sol';
import { _ForwardedMetaTransactionContext } from './_ForwardedMetaTransactionContext.sol';

abstract contract ForwardedMetaTransactionContext is
    IForwardedMetaTransactionContext,
    _ForwardedMetaTransactionContext,
    Context
{
    /**
     * @inheritdoc IERC2771
     */
    function isTrustedForwarder(
        address account
    ) external view returns (bool trustedStatus) {
        trustedStatus = _isTrustedForwarder(account);
    }

    /**
     * @inheritdoc _ForwardedMetaTransactionContext
     */
    function _msgSender()
        internal
        virtual
        override(_Context, _ForwardedMetaTransactionContext)
        returns (address msgSender)
    {
        msgSender = super._msgSender();
    }

    /**
     * @inheritdoc _ForwardedMetaTransactionContext
     */
    function _msgData()
        internal
        virtual
        override(_Context, _ForwardedMetaTransactionContext)
        returns (bytes calldata msgData)
    {
        msgData = super._msgData();
    }

    /**
     * @inheritdoc _ForwardedMetaTransactionContext
     */
    function _calldataSuffixLength()
        internal
        view
        virtual
        override(_Context, _ForwardedMetaTransactionContext)
        returns (uint256 length)
    {
        length = super._calldataSuffixLength();
    }
}
