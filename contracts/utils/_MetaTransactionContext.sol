// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Context } from './_Context.sol';

abstract contract _MetaTransactionContext is _Context {
    /*
     * @notice Returns the intended sender of a message. Either msg.sender or the address of the authorizing signer.
     *         Enables MetaTransactions, since the sender doesn't need to be the tx.origin or even the msg.sender.
     * @returns address - The account whose authority is being acted on.
     * and the end-user for GSN relayed calls (where msg.sender is actually `RelayHub`).
     *
     * IMPORTANT: Contracts derived from {GSNRecipient} should never use `msg.sender`, and use {_msgSender} instead.
     */
    function _msgSender()
        internal
        view
        virtual
        override
        returns (address msgSender)
    {
        if (msg.sender == address(this)) {
            // We need to read 20 bytes (an address) located at array index msg.data.length - 20. In memory, the array
            // is prefixed with a 32-byte length value, so we first add 32 to get the memory read index. However, doing
            // so would leave the address in the upper 20 bytes of the 32-byte word, which is inconvenient and would
            // require bit shifting. We therefore subtract 12 from the read index so the address lands on the lower 20
            // bytes. This can always be done due to the 32-byte prefix.

            // The final memory read index is msg.data.length - 20 + 32 - 12 = msg.data.length. Using inline assembly is the
            // easiest/most-efficient way to perform this operation.

            // These fields are not accessible from assembly
            bytes memory array = msg.data;
            uint256 index = msg.data.length;

            // solhint-disable-next-line no-inline-assembly
            assembly {
                // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
                msgSender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            msgSender = msg.sender;
        }
    }

    function _msgData()
        internal
        view
        virtual
        override
        returns (bytes calldata msgData)
    {
        if (msg.sender == address(this)) {
            msgData = msg.data[:msg.data.length - _calldataSuffixLength()];
        } else {
            msgData = msg.data;
        }
    }

    function _calldataSuffixLength()
        internal
        view
        virtual
        override
        returns (uint256 length)
    {
        length = 20;
    }
}
