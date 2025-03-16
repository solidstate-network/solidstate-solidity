// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _SafeOwnable } from '../../access/ownable/_SafeOwnable.sol';
import { _Ownable } from '../../access/ownable/_Ownable.sol';
import { _DiamondProxyExecutable } from './executable/_DiamondProxyExecutable.sol';
import { _DiamondProxyFallback } from './fallback/_DiamondProxyFallback.sol';
import { _DiamondProxyReadable } from './readable/_DiamondProxyReadable.sol';
import { _DiamondProxyWritable } from './writable/_DiamondProxyWritable.sol';
import { _ISolidstateDiamondProxy } from './_ISolidstateDiamondProxy.sol';

abstract contract _SolidstateDiamondProxy is
    _ISolidstateDiamondProxy,
    _DiamondProxyExecutable,
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
        override(_DiamondProxyExecutable, _DiamondProxyFallback)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
