// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { EIP712 } from './EIP712.sol';

contract EIP712Mock {
    function calculateDomainSeparator(
        bytes32 nameHash,
        bytes32 versionHash
    ) external view returns (bytes32) {
        return EIP712.calculateDomainSeparator(nameHash, versionHash);
    }
}
