// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _ContractSigner } from '../_ContractSigner.sol';
import { _Ownable } from '../../../access/ownable/_Ownable.sol';
import { ECDSA } from '../../../cryptography/ECDSA.sol';
import { _IContractSignerOwnable } from './_IContractSignerOwnable.sol';

/**
 * @title ContractSignerOwnable internal functions
 */
abstract contract _ContractSignerOwnable is
    _IContractSignerOwnable,
    _ContractSigner,
    _Ownable
{
    using ECDSA for bytes32;

    /**
     * @inheritdoc _ContractSigner
     * @notice return whether given signature is signed by contract owner
     */
    function _isValidSignature(
        bytes32 hash,
        bytes memory signature
    ) internal view virtual override returns (bytes4 magicValue) {
        return
            hash.toEthSignRecoverableHash().recover(signature) == _owner()
                ? MAGIC_VALUE
                : bytes4(0);
    }
}
