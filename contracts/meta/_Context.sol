// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IContext } from './_IContext.sol';

/**
 * @title Utility contract for supporting alternative authorization schemes
 */
abstract contract _Context is _IContext {
    /**
     * @notice return the message sender
     * @dev if no Context extension is in use, msg.sender is returned as-is
     * @return msgSender account contextualized as message sender
     */
    function _msgSender() internal view virtual returns (address msgSender) {
        msgSender = msg.sender;
    }

    /**
     * @notice return the message data
     * @dev if no Context extension is in use, msg.data is returned as-is
     * @return msgData message data with suffix removed, if applicable
     */
    function _msgData() internal view virtual returns (bytes calldata msgData) {
        msgData = msg.data;
    }

    /**
     * @notice return the bytes length of the calldata context suffix
     * @dev if no Context extension is in use, suffix length is 0
     * @return length length of calldata context suffix
     */
    function _calldataSuffixLength()
        internal
        view
        virtual
        returns (uint256 length)
    {
        length = 0;
    }
}
