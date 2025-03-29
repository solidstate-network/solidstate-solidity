// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Context } from '../../meta/Context.sol';
import { IPausable } from './IPausable.sol';
import { _Pausable } from './_Pausable.sol';

/**
 * @title Pausable security control module.
 */
abstract contract Pausable is IPausable, _Pausable, Context {
    /**
     * @inheritdoc IPausable
     */
    function paused() external view returns (bool status) {
        status = _paused();
    }
}
