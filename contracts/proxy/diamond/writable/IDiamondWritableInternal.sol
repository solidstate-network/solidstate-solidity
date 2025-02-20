// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnableInternal } from '../../../access/ownable/IOwnableInternal.sol';
import { IERC2535DiamondCutInternal } from '../../../interfaces/IERC2535DiamondCutInternal.sol';

interface IDiamondWritableInternal is
    IERC2535DiamondCutInternal,
    IOwnableInternal
{
    error DiamondWritable__InvalidInitializationParameters();
    error DiamondWritable__RemoveTargetNotZeroAddress();
    error DiamondWritable__ReplaceTargetIsIdentical();
    error DiamondWritable__SelectorAlreadyAdded();
    error DiamondWritable__SelectorIsImmutable();
    error DiamondWritable__SelectorNotFound();
    error DiamondWritable__SelectorNotSpecified();
    error DiamondWritable__TargetHasNoCode();
}
