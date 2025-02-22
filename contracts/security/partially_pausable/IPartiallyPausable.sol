// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IPartiallyPausableInternal } from './IPartiallyPausableInternal.sol';

interface IPartiallyPausable is IPartiallyPausableInternal {
    /**
     * @notice query whether contract is paused in the scope of given key
     * @return status whether contract is paused in the scope of given key
     */
    function partiallyPaused(bytes32 key) external view returns (bool status);
}
