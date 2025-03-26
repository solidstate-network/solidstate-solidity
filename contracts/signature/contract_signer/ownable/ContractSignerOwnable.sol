// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ContractSigner } from '../ContractSigner.sol';
import { _ContractSigner } from '../_ContractSigner.sol';
import { IContractSignerOwnable } from './IContractSignerOwnable.sol';
import { _ContractSignerOwnable } from './_ContractSignerOwnable.sol';

/**
 * @title ERC1271 implementation which delegates signing authority to ERC173 contract owner
 */
abstract contract ContractSignerOwnable is
    IContractSignerOwnable,
    _ContractSignerOwnable,
    ContractSigner
{
    /**
     * @inheritdoc _ContractSignerOwnable
     */
    function _isValidSignature(
        bytes32 hash,
        bytes memory signature
    )
        internal
        view
        virtual
        override(_ContractSigner, _ContractSignerOwnable)
        returns (bytes4 magicValue)
    {
        magicValue = super._isValidSignature(hash, signature);
    }
}
