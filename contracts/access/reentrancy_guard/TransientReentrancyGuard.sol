// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ReentrancyGuard } from './ReentrancyGuard.sol';
import { _ReentrancyGuard } from './_ReentrancyGuard.sol';
import { ITransientReentrancyGuard } from './ITransientReentrancyGuard.sol';
import { _TransientReentrancyGuard } from './_TransientReentrancyGuard.sol';

abstract contract TransientReentrancyGuard is
    ITransientReentrancyGuard,
    _TransientReentrancyGuard,
    ReentrancyGuard
{
    function _isReentrancyGuardLocked()
        internal
        view
        virtual
        override(_ReentrancyGuard, _TransientReentrancyGuard)
        returns (bool status)
    {
        status = super._isReentrancyGuardLocked();
    }

    function _lockReentrancyGuard()
        internal
        virtual
        override(_ReentrancyGuard, _TransientReentrancyGuard)
    {
        super._lockReentrancyGuard();
    }

    function _unlockReentrancyGuard()
        internal
        virtual
        override(_ReentrancyGuard, _TransientReentrancyGuard)
    {
        super._unlockReentrancyGuard();
    }
}
