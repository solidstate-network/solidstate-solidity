// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnable } from './IOwnable.sol';
import { _ISafeOwnable } from './_ISafeOwnable.sol';

interface ISafeOwnable is _ISafeOwnable, IOwnable {
    /**
     * @notice get the nominated owner who has permission to call acceptOwnership
     */
    function nomineeOwner() external view returns (address);

    /**
     * @notice accept transfer of contract ownership
     */
    function acceptOwnership() external;
}
