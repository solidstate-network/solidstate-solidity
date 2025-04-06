// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { sslot } from '../data/Slot.sol';

library ERC2981Storage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.ERC2981
     */
    struct Layout {
        mapping(uint256 tokenId => uint16 royaltyBPS) royaltiesBPS;
        uint16 defaultRoyaltyBPS;
        mapping(uint256 tokenId => address royaltyReceiver) royaltyReceivers;
        address defaultRoyaltyReceiver;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(
            keccak256(
                abi.encode(
                    uint256(keccak256(bytes('solidstate.layout.ERC2981'))) - 1
                )
            ) & ~bytes32(uint256(0xff))
        );

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(sslot slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
