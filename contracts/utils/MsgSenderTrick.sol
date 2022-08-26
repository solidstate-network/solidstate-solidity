// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

/**
 * @title Utility contract for supporting alternative authorization schemes
 */
abstract contract MsgSenderTrick {
    /*
     * @notice Overrides the msgSender to enable delegation message signing.
     * @returns address - The account whose authority is being acted on.
     */
    function _msgSender() internal view virtual returns (address sender) {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                sender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            sender = msg.sender;
        }
        return sender;
    }
}
