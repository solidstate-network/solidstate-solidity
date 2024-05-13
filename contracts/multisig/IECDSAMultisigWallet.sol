// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IECDSAMultisigWalletInternal } from './IECDSAMultisigWalletInternal.sol';

interface IECDSAMultisigWallet is IECDSAMultisigWalletInternal {
    /**
     * @notice verify signatures and execute "call" or "delegatecall" with given parameters
     * @dev message parameters must be included in signature
     * @param parameters structured call parameters (target, data, value, delegate)
     * @param signatures array of structured signature data (signature, nonce)
     */
    function verifyAndExecute(
        Parameters memory parameters,
        Signature[] memory signatures
    ) external payable returns (bytes memory);
}
