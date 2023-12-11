// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import { IOwnableInternal } from './IOwnableInternal.sol';

interface ISafeOwnableInternal is IOwnableInternal {
    error SafeOwnable__NotNomineeOwner();
}
