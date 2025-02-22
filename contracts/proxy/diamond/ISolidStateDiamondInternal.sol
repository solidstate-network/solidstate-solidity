// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISafeOwnableInternal } from '../../access/ownable/ISafeOwnableInternal.sol';
import { IERC165BaseInternal } from '../../introspection/ERC165/base/IERC165BaseInternal.sol';
import { IDiamondBaseInternal } from './base/IDiamondBaseInternal.sol';
import { IDiamondFallbackInternal } from './fallback/IDiamondFallbackInternal.sol';
import { IDiamondReadableInternal } from './readable/IDiamondReadableInternal.sol';
import { IDiamondWritableInternal } from './writable/IDiamondWritableInternal.sol';

interface ISolidStateDiamondInternal is
    IDiamondBaseInternal,
    IDiamondFallbackInternal,
    IDiamondReadableInternal,
    IDiamondWritableInternal,
    ISafeOwnableInternal,
    IERC165BaseInternal
{}
