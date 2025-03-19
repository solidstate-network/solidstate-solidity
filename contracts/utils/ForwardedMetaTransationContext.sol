// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2771 } from '../interfaces/IERC2771.sol';
import { Context } from './Context.sol';
import { _Context } from './_Context.sol';
import { IForwardedMetaTransationContext } from './IForwardedMetaTransationContext.sol';
import { _ForwardedMetaTransationContext } from './_ForwardedMetaTransationContext.sol';

abstract contract ForwardedMetaTransationContext is
    IForwardedMetaTransationContext,
    _ForwardedMetaTransationContext,
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
     * @inheritdoc _ForwardedMetaTransationContext
     */
    function _msgSender()
        internal
        view
        virtual
        override(_Context, _ForwardedMetaTransationContext)
        returns (address msgSender)
    {
        msgSender = super._msgSender();
    }

    /**
     * @inheritdoc _ForwardedMetaTransationContext
     */
    function _msgData()
        internal
        view
        virtual
        override(_Context, _ForwardedMetaTransationContext)
        returns (bytes calldata msgData)
    {
        msgData = super._msgData();
    }

    /**
     * @inheritdoc _ForwardedMetaTransationContext
     */
    function _calldataSuffixLength()
        internal
        view
        virtual
        override(_Context, _ForwardedMetaTransationContext)
        returns (uint256 length)
    {
        length = super._calldataSuffixLength();
    }
}
