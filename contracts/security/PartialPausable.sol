// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { PartialPausableInternal } from './PartialPausableInternal.sol';

/**
 * @title PartialPausable security control module.
 */
abstract contract PartialPausable is PartialPausableInternal {
    function partialPaused(address facet) external view virtual returns (bool) {
        return _partialPaused(facet);
    }
}
