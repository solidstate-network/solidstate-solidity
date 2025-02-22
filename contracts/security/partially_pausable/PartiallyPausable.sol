// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IPartiallyPausable } from './IPartiallyPausable.sol';
import { PartiallyPausableInternal } from './PartiallyPausableInternal.sol';

/**
 * @title PartiallyPausable security control module.
 */
abstract contract PartiallyPausable is
    IPartiallyPausable,
    PartiallyPausableInternal
{
    /**
     * @inheritdoc IPartiallyPausable
     */
    function partiallyPaused(
        bytes32 key
    ) external view virtual returns (bool status) {
        status = _partiallyPaused(key);
    }
}
