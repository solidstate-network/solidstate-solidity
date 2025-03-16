// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC2535DiamondCut } from '../../../interfaces/_IERC2535DiamondCut.sol';
import { _IERC2535DiamondLoupe } from '../../../interfaces/_IERC2535DiamondLoupe.sol';
import { _IProxy } from '../../_IProxy.sol';

interface _IDiamondProxyCommon is
    _IProxy,
    _IERC2535DiamondCut,
    _IERC2535DiamondLoupe
{
    error DiamondProxyWritable__InvalidInitializationParameters();
    error DiamondProxyWritable__RemoveTargetNotZeroAddress();
    error DiamondProxyWritable__ReplaceTargetIsIdentical();
    error DiamondProxyWritable__SelectorAlreadyAdded();
    error DiamondProxyWritable__SelectorIsImmutable();
    error DiamondProxyWritable__SelectorNotFound();
    error DiamondProxyWritable__SelectorNotSpecified();
    error DiamondProxyWritable__TargetHasNoCode();
}
