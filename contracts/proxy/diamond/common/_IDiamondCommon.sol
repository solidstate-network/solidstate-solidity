// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC2535DiamondCut } from '../../../interfaces/_IERC2535DiamondCut.sol';
import { _IERC2535DiamondLoupe } from '../../../interfaces/_IERC2535DiamondLoupe.sol';

interface _IDiamondCommon is _IERC2535DiamondCut, _IERC2535DiamondLoupe {
    error DiamondWritable__InvalidInitializationParameters();
    error DiamondWritable__RemoveTargetNotZeroAddress();
    error DiamondWritable__ReplaceTargetIsIdentical();
    error DiamondWritable__SelectorAlreadyAdded();
    error DiamondWritable__SelectorIsImmutable();
    error DiamondWritable__SelectorNotFound();
    error DiamondWritable__SelectorNotSpecified();
    error DiamondWritable__TargetHasNoCode();
}
