// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC173 } from '../../interfaces/IERC173.sol';
import { IOwnable } from './IOwnable.sol';
import { _Ownable } from './_Ownable.sol';

/**
 * @title Ownership access control based on ERC173
 */
abstract contract Ownable is IOwnable, _Ownable {
    /**
     * @inheritdoc IERC173
     */
    function owner() public view virtual returns (address) {
        return _owner();
    }

    /**
     * @inheritdoc IERC173
     */
    function transferOwnership(address account) public virtual {
        _transferOwnership(account);
    }
}
