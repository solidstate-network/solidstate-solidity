// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC173 } from '../../interfaces/IERC173.sol';
import { Context } from '../../meta/Context.sol';
import { _Ownable } from './_Ownable.sol';
import { IOwnable } from './IOwnable.sol';

/**
 * @title Ownership access control based on ERC173
 */
abstract contract Ownable is IOwnable, _Ownable, Context {
    /**
     * @inheritdoc IERC173
     */
    function owner() external view returns (address) {
        return _owner();
    }

    /**
     * @inheritdoc IERC173
     */
    function transferOwnership(address account) external {
        _transferOwnership(account);
    }
}
