// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { PartialPausableStorage } from './PartialPausableStorage.sol';

/**
 * @title Internal functions for PartialPausable security control module.
 */
abstract contract PartialPausableInternal {
    using PartialPausableStorage for PartialPausableStorage.Layout;

    error PartialPausable__Paused();
    error PartialPausable__NotPaused();

    event PartialPaused(address account, address facet);
    event PartialUnpaused(address account, address facet);

    modifier whenNotPartialPaused(address facet) {
        if (_partialPaused(facet)) revert PartialPausable__Paused();
        _;
    }

    modifier whenPartialPaused(address facet) {
        if (!_partialPaused(facet)) revert PartialPausable__NotPaused();
        _;
    }

    /**
     * @notice query the contracts partialPaused state.
     * param facet address of the facet.
     * @return true if paused, false if unpaused.
     */
    function _partialPaused(address facet)
        internal
        view
        virtual
        returns (bool)
    {
        return PartialPausableStorage.layout().partialPaused[facet];
    }

    /**
     * @notice Triggers partial paused state, when contract is partial unpaused.
     * param facet address of the facet to be paused.
     */
    function _partialPause(address facet)
        internal
        virtual
        whenNotPartialPaused(facet)
    {
        PartialPausableStorage.layout().partialPaused[facet] = true;
        emit PartialPaused(msg.sender, facet);
    }

    /**
     * @notice Triggers partial unpaused state, when contract is partialPaused.
     * param facet address of the facet to be unpaused.
     */
    function _partialUnpause(address facet)
        internal
        virtual
        whenPartialPaused(facet)
    {
        PartialPausableStorage.layout().partialPaused[facet] = false;
        emit PartialUnpaused(msg.sender, facet);
    }
}
