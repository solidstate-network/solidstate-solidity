// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IECDSAMultisigWallet } from './IECDSAMultisigWallet.sol';
import { ECDSAMultisigWalletInternal } from './ECDSAMultisigWalletInternal.sol';

/**
 * @title ECDSA-verified multisig wallet contract
 * @dev inheriting contract should provide functions to read and write nonce invalidation status
 */
abstract contract ECDSAMultisigWallet is
    IECDSAMultisigWallet,
    ECDSAMultisigWalletInternal
{
    receive() external payable virtual {}

    /**
     * @inheritdoc IECDSAMultisigWallet
     */
    function verifyAndExecute(
        Parameters memory parameters,
        Signature[] memory signatures
    ) external payable returns (bytes memory) {
        return _verifyAndExecute(parameters, signatures);
    }
}
