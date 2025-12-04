// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _PartiallyPausable } from './_PartiallyPausable.sol';
import { IPartiallyPausable } from './IPartiallyPausable.sol';

/**
 * @title PartiallyPausable security control module.
 */
abstract contract PartiallyPausable is IPartiallyPausable, _PartiallyPausable {
    /**
     * @inheritdoc IPartiallyPausable
     */
    function partiallyPaused(bytes32 key) external view returns (bool status) {
        status = _partiallyPaused(key);
    }
}
