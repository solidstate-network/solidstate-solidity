// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IContext } from './_IContext.sol';
/**
 * @title Utility contract for supporting alternative authorization schemes
 */
abstract contract _Context is _IContext {
    function _msgSender() internal view virtual returns (address msgSender) {
        msgSender = msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata msgData) {
        msgData = msg.data;
    }

    function _calldataSuffixLength()
        internal
        view
        virtual
        returns (uint256 length)
    {
        length = 0;
    }
}
