// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Context } from './_Context.sol';

abstract contract _MetaTransactionContext is _Context {
    function _msgSender()
        internal
        view
        virtual
        override
        returns (address msgSender)
    {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;

            assembly {
                msgSender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            msgSender = super._msgSender();
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
            msgData = super._msgData();
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
