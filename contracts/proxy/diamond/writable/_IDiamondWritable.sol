// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IERC2535DiamondCut } from '../../../interfaces/_IERC2535DiamondCut.sol';
import { _IERC165Base } from '../../../introspection/ERC165/base/_IERC165Base.sol';
import { _IDiamondCommon } from '../common/_IDiamondCommon.sol';

interface _IDiamondWritable is
    _IERC2535DiamondCut,
    _IDiamondCommon,
    _IOwnable,
    _IERC165Base
{}
