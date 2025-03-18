// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC2771Storage } from '../storage/ERC2771Storage.sol';
import { _Context } from './_Context.sol';
import { _IForwardedMetaTransationContext } from './_IForwardedMetaTransationContext.sol';

abstract contract _ForwardedMetaTransationContext is
    _IForwardedMetaTransationContext,
    _Context
{
    /**
     * @inheritdoc _Context
     * @dev sender is read from the calldata context suffix
     */
    function _msgSender()
        internal
        view
        virtual
        override
        returns (address msgSender)
    {
        if (_isTrustedForwarder(msg.sender)) {
            msgSender = address(
                bytes20(msg.data[msg.data.length - _calldataSuffixLength():])
            );
        } else {
            msgSender = super._msgSender();
        }
    }

    /**
     * @inheritdoc _Context
     */
    function _msgData()
        internal
        view
        virtual
        override
        returns (bytes calldata msgData)
    {
        if (_isTrustedForwarder(msg.sender)) {
            msgData = msg.data[:msg.data.length - _calldataSuffixLength()];
        } else {
            msgData = super._msgData();
        }
    }

    /**
     * @inheritdoc _Context
     * @dev this Context extension defines an address suffix with a length of 20
     */
    function _calldataSuffixLength()
        internal
        view
        virtual
        override
        returns (uint256 length)
    {
        length = 20;
    }

    function _isTrustedForwarder(
        address account
    ) internal view virtual returns (bool trustedStatus) {
        return
            ERC2771Storage
                .layout(ERC2771Storage.DEFAULT_STORAGE_SLOT)
                .trustedForwarders[account];
    }
}
