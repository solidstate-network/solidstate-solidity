// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1271 } from '../../interfaces/IERC1271.sol';
import { IContractSigner } from './IContractSigner.sol';
import { _ContractSigner } from './_ContractSigner.sol';

/**
 * @title Base implementation of ERC1721
 * @dev _isValidSignature function must be overridden with application-specific logic
 */
abstract contract ContractSigner is IContractSigner, _ContractSigner {
    /**
     * @inheritdoc IERC1271
     */
    function isValidSignature(
        bytes32 hash,
        bytes memory signature
    ) external view returns (bytes4) {
        return _isValidSignature(hash, signature);
    }
}
