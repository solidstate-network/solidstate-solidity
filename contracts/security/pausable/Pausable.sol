// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IPausable } from './IPausable.sol';
import { _Pausable } from './_Pausable.sol';

/**
 * @title Pausable security control module.
 */
abstract contract Pausable is IPausable, _Pausable {
    /**
     * @inheritdoc IPausable
     */
    function paused() external view returns (bool status) {
        status = _paused();
    }
}
