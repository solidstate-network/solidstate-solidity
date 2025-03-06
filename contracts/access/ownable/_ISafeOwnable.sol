// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from './_IOwnable.sol';

interface _ISafeOwnable is _IOwnable {
    error SafeOwnable__NotNomineeOwner();
}
