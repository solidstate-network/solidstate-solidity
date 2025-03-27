// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IPausable } from './_IPausable.sol';

interface IPausable is _IPausable {
    /**
     * @notice query whether contract is paused
     * @return status whether contract is paused
     */
    function paused() external view returns (bool status);
}
