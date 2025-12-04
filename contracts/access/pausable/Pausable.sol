// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { Context } from '../../meta/Context.sol';
import { _Pausable } from './_Pausable.sol';
import { IPausable } from './IPausable.sol';

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
