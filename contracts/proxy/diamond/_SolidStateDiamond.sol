// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _SafeOwnable } from '../../access/ownable/_SafeOwnable.sol';
import { _Ownable } from '../../access/ownable/_Ownable.sol';
import { _DiamondBase } from './base/_DiamondBase.sol';
import { _DiamondFallback } from './fallback/_DiamondFallback.sol';
import { _DiamondReadable } from './readable/_DiamondReadable.sol';
import { _DiamondWritable } from './writable/_DiamondWritable.sol';
import { _ISolidStateDiamond } from './_ISolidStateDiamond.sol';

abstract contract _SolidStateDiamond is
    _ISolidStateDiamond,
    _DiamondBase,
    _DiamondFallback,
    _DiamondReadable,
    _DiamondWritable,
    _SafeOwnable
{
    function _transferOwnership(
        address account
    ) internal virtual override(_Ownable, _SafeOwnable) {
        super._transferOwnership(account);
    }

    /**
     * @inheritdoc _DiamondFallback
     */
    function _getImplementation()
        internal
        view
        virtual
        override(_DiamondBase, _DiamondFallback)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
