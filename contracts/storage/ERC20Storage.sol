// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC20Storage {
    struct Snapshots {
        uint256[] ids;
        uint256[] values;
    }

    /**
     * @custom:storage-location erc7201:solidstate.contracts.storage.ERC20
     */
    struct Layout {
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
        uint256 totalSupply;
        string name;
        string symbol;
        uint8 decimals;
        mapping(address => uint256) nonces;
        mapping(address => Snapshots) accountBalanceSnapshots;
        Snapshots totalSupplySnapshots;
        uint256 snapshotId;
        mapping(uint8 => string) restrictions;
        address asset;
        mapping(address => bool) implicitApprovals;
    }

    bytes32 internal constant DEFAULT_STORAGE_SLOT =
        keccak256(
            abi.encode(
                uint256(
                    keccak256(bytes('solidstate.contracts.storage.ERC20'))
                ) - 1
            )
        ) & ~bytes32(uint256(0xff));

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(bytes32 slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
