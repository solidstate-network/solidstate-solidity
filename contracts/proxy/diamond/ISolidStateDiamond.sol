// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ISafeOwnable } from '../../access/ISafeOwnable.sol';
import { IERC165 } from '../../introspection/IERC165.sol';
import { IDiamondReadable } from './readable/IDiamondReadable.sol';
import { IDiamondWritable } from './writable/IDiamondWritable.sol';

interface ISolidStateDiamond is
    IDiamondReadable,
    IDiamondWritable,
    ISafeOwnable,
    IERC165
{}
