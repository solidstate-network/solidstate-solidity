// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IERC2535DiamondCut } from '../../../interfaces/_IERC2535DiamondCut.sol';
import { _IERC165Base } from '../../../introspection/ERC165/base/_IERC165Base.sol';

interface _IDiamondWritable is _IERC2535DiamondCut, _IOwnable, _IERC165Base {
    error DiamondWritable__InvalidInitializationParameters();
    error DiamondWritable__RemoveTargetNotZeroAddress();
    error DiamondWritable__ReplaceTargetIsIdentical();
    error DiamondWritable__SelectorAlreadyAdded();
    error DiamondWritable__SelectorIsImmutable();
    error DiamondWritable__SelectorNotFound();
    error DiamondWritable__SelectorNotSpecified();
    error DiamondWritable__TargetHasNoCode();
}
