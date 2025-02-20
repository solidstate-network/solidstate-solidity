// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ECDSA } from './ECDSA.sol';

contract ECDSAMock {
    function recover(
        bytes32 hash,
        bytes memory signature
    ) external pure returns (address) {
        return ECDSA.recover(hash, signature);
    }

    function recover(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external pure returns (address) {
        return ECDSA.recover(hash, v, r, s);
    }

    function toEthSignedMessageHash(
        bytes32 hash
    ) external pure returns (bytes32) {
        return ECDSA.toEthSignedMessageHash(hash);
    }
}
