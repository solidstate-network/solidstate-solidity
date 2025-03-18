// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IForwardedMetaTransationContext } from './IForwardedMetaTransationContext.sol';
import { _ForwardedMetaTransationContext } from './_ForwardedMetaTransationContext.sol';

abstract contract ForwardedMetaTransationContext is
    IForwardedMetaTransationContext,
    _ForwardedMetaTransationContext
{
    function isTrustedForwarder(
        address account
    ) external view returns (bool trustedStatus) {
        trustedStatus = _isTrustedForwarder(account);
    }
}
