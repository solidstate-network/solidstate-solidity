// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { sslot } from '../data/StorageSlot.sol';

library ERC20Storage {
    struct Snapshots {
        uint256[] ids;
        uint256[] values;
    }

    /**
     * @custom:storage-location erc7201:solidstate.layout.ERC20
     */
    struct Layout {
        mapping(address account => uint256 balance) balances;
        mapping(address holder => mapping(address spender => uint256 allowance)) allowances;
        uint256 totalSupply;
        string name;
        string symbol;
        uint8 decimals;
        mapping(address account => Snapshots balanceSnapshots) accountBalanceSnapshots;
        Snapshots totalSupplySnapshots;
        uint256 snapshotId;
        mapping(uint8 restrictionCode => string restrictionMessage) erc1404RestrictionMessages;
        mapping(address account => uint256 nonce) erc2612Nonces;
        address erc4626Asset;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(
            keccak256(
                abi.encode(
                    uint256(keccak256(bytes('solidstate.layout.ERC20'))) - 1
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
