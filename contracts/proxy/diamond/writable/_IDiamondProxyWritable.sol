// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IDiamondProxy } from '../_IDiamondProxy.sol';
import { _IERC2535DiamondCut } from '../../../interfaces/_IERC2535DiamondCut.sol';
import { _IIntrospectable } from '../../../introspection/_IIntrospectable.sol';

interface _IDiamondProxyWritable is
    _IERC2535DiamondCut,
    _IDiamondProxy,
    _IIntrospectable
{}
