// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IERC2535DiamondCut } from '../../../interfaces/_IERC2535DiamondCut.sol';
import { _IIntrospectable } from '../../../introspection/_IIntrospectable.sol';
import { _IDiamondProxyCommon } from '../common/_IDiamondProxyCommon.sol';

interface _IDiamondProxyWritable is
    _IERC2535DiamondCut,
    _IDiamondProxyCommon,
    _IOwnable,
    _IIntrospectable
{}
