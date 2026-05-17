// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC2535DiamondCut } from '../../../interfaces/_IERC2535DiamondCut.sol';
import { _IIntrospectable } from '../../../introspection/_IIntrospectable.sol';
import { _IDiamondProxy } from '../_IDiamondProxy.sol';

interface _IDiamondProxyWritable is
    _IERC2535DiamondCut,
    _IDiamondProxy,
    _IIntrospectable
{}
