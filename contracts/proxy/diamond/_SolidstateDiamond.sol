// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _SafeOwnable } from '../../access/ownable/_SafeOwnable.sol';
import { _Ownable } from '../../access/ownable/_Ownable.sol';
import { _DiamondBase } from './base/_DiamondBase.sol';
import { _DiamondProxyFallback } from './fallback/_DiamondProxyFallback.sol';
import { _DiamondProxyReadable } from './readable/_DiamondProxyReadable.sol';
import { _DiamondProxyWritable } from './writable/_DiamondProxyWritable.sol';
import { _ISolidstateDiamond } from './_ISolidstateDiamond.sol';

abstract contract _SolidstateDiamond is
    _ISolidstateDiamond,
    _DiamondBase,
    _DiamondProxyFallback,
    _DiamondProxyReadable,
    _DiamondProxyWritable,
    _SafeOwnable
{
    function _transferOwnership(
        address account
    ) internal virtual override(_Ownable, _SafeOwnable) {
        super._transferOwnership(account);
    }

    /**
     * @inheritdoc _DiamondProxyFallback
     */
    function _getImplementation()
        internal
        view
        virtual
        override(_DiamondBase, _DiamondProxyFallback)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
