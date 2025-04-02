// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IPartiallyPausable } from './_IPartiallyPausable.sol';

interface IPartiallyPausable is _IPartiallyPausable {
    /**
     * @notice query whether contract is paused in the scope of given key
     * @return status whether contract is paused in the scope of given key
     */
    function partiallyPaused(bytes32 key) external view returns (bool status);
}
