// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { EnumerableMap } from '../data/EnumerableMap.sol';
import { EnumerableSet } from '../data/EnumerableSet.sol';
import { sslot } from '../data/StorageSlot.sol';

library ERC721Storage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.ERC721
     */
    struct Layout {
        EnumerableMap.UintToAddressMap tokenOwners;
        mapping(address account => EnumerableSet.UintSet tokenIds) holderTokens;
        mapping(uint256 tokenId => address account) tokenApprovals;
        mapping(address holder => mapping(address operator => bool approvalStatus)) operatorApprovals;
        string name;
        string symbol;
        string baseURI;
        mapping(uint256 tokenId => string tokenURI) tokenURIs;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(
            keccak256(
                abi.encode(
                    uint256(keccak256(bytes('solidstate.layout.ERC721'))) - 1
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
