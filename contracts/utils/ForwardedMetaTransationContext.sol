// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2771 } from '../interfaces/IERC2771.sol';
import { IForwardedMetaTransationContext } from './IForwardedMetaTransationContext.sol';
import { _ForwardedMetaTransationContext } from './_ForwardedMetaTransationContext.sol';

abstract contract ForwardedMetaTransationContext is
    IForwardedMetaTransationContext,
    _ForwardedMetaTransationContext
{
    /**
     * @inheritdoc IERC2771
     */
    function isTrustedForwarder(
        address account
    ) external view returns (bool trustedStatus) {
        trustedStatus = _isTrustedForwarder(account);
    }
}
