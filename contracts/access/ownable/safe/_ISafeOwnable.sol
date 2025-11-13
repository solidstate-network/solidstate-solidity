// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { timestamp } from '../../../utils/time/Timestamp.sol';
import { _IOwnable } from '../_IOwnable.sol';

interface _ISafeOwnable is _IOwnable {
    event OwnershipTransferInitiated(
        address indexed previousOwner,
        address indexed newOwner,
        timestamp timelockEndTimestamp
    );

    error SafeOwnable__NotNomineeOwner();
}
