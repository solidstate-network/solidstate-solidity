// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { EnumerableSet } from '../data/EnumerableSet.sol';
import { Slot } from '../data/Slot.sol';

library ERC1155Storage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.ERC1155
     */
    struct Layout {
        mapping(uint256 tokenId => mapping(address account => uint256 balance)) balances;
        mapping(address holder => mapping(address operator => bool approvalStatus)) operatorApprovals;
        string baseURI;
        mapping(uint256 tokenId => string tokenURI) tokenURIs;
        mapping(uint256 tokenId => uint256 supply) totalSupply;
        mapping(uint256 tokenId => EnumerableSet.AddressSet holders) accountsByToken;
        mapping(address account => EnumerableSet.UintSet tokenIds) tokensByAccount;
    }

    Slot.StorageSlot internal constant DEFAULT_STORAGE_SLOT =
        Slot.StorageSlot.wrap(
            keccak256(
                abi.encode(
                    uint256(keccak256(bytes('solidstate.layout.ERC1155'))) - 1
                )
            ) & ~bytes32(uint256(0xff))
        );

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(
        Slot.StorageSlot slot
    ) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
