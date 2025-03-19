// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC2771Storage } from '../storage/ERC2771Storage.sol';
import { AddressUtils } from './AddressUtils.sol';
import { _Context } from './_Context.sol';
import { _IForwardedMetaTransactionContext } from './_IForwardedMetaTransactionContext.sol';

abstract contract _ForwardedMetaTransactionContext is
    _IForwardedMetaTransactionContext,
    _Context
{
    using AddressUtils for address;

    error ForwardedMetaTransactionContext__TrustedForwarderMustBeContract();

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
        uint256 dataLength = msg.data.length;
        uint256 suffixLength = _calldataSuffixLength();

        // ideally this would revert when dataLength < suffixLength and sender is a trusted forwarder
        // but because _isTrustedForwarder reads from storage, it should be called only when necessary

        if (dataLength >= suffixLength && _isTrustedForwarder(msg.sender)) {
            unchecked {
                msgSender = address(
                    bytes20(msg.data[dataLength - suffixLength:])
                );
            }
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
        uint256 dataLength = msg.data.length;
        uint256 suffixLength = _calldataSuffixLength();

        // ideally this would revert when dataLength < suffixLength and sender is a trusted forwarder
        // but because _isTrustedForwarder reads from storage, it should be called only when necessary

        if (dataLength >= suffixLength && _isTrustedForwarder(msg.sender)) {
            unchecked {
                msgData = msg.data[:dataLength - suffixLength];
            }
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

    /**
     * @notice query whether account is a trusted ERC2771 forwarder
     * @dev only contracts can be considered trusted forwarders
     * @param account address to query
     * @return trustedStatus whether account is a trusted forwarder
     */
    function _isTrustedForwarder(
        address account
    ) internal view virtual returns (bool trustedStatus) {
        trustedStatus =
            account.isContract() &&
            ERC2771Storage
                .layout(ERC2771Storage.DEFAULT_STORAGE_SLOT)
                .trustedForwarders[account];
    }

    /**
     * @notice grant trusted forwarder status to account
     * @param account account whose trusted forwarder status to grant
     */
    function _addTrustedForwarder(address account) internal virtual {
        // exception for address(this) allows a contract to set itself as a trusted forwarder in its constructor
        if (!account.isContract() && account != address(this))
            revert ForwardedMetaTransactionContext__TrustedForwarderMustBeContract();

        ERC2771Storage
            .layout(ERC2771Storage.DEFAULT_STORAGE_SLOT)
            .trustedForwarders[account] = true;
    }

    /**
     * @notice revoke trusted forwarder status from account
     * @param account account whose trusted forwarder status to revoke
     */
    function _removeTrustedForwarder(address account) internal virtual {
        delete ERC2771Storage
            .layout(ERC2771Storage.DEFAULT_STORAGE_SLOT)
            .trustedForwarders[account];
    }
}
