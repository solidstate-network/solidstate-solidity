// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IOwnable } from '../_IOwnable.sol';

interface _ISafeOwnable is _IOwnable {
    error SafeOwnable__NotNomineeOwner();
    error SafeOwnable__TimelockActive();
}
