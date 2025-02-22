// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISafeOwnable } from '../../access/ownable/ISafeOwnable.sol';
import { IERC165Base } from '../../introspection/ERC165/base/IERC165Base.sol';
import { IDiamondBase } from './base/IDiamondBase.sol';
import { IDiamondFallback } from './fallback/IDiamondFallback.sol';
import { IDiamondReadable } from './readable/IDiamondReadable.sol';
import { IDiamondWritable } from './writable/IDiamondWritable.sol';
import { ISolidStateDiamondInternal } from './ISolidStateDiamondInternal.sol';

interface ISolidStateDiamond is
    ISolidStateDiamondInternal,
    IDiamondBase,
    IDiamondFallback,
    IDiamondReadable,
    IDiamondWritable,
    ISafeOwnable,
    IERC165Base
{
    receive() external payable;
}
