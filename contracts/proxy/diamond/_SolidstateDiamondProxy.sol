// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _DiamondProxy } from './_DiamondProxy.sol';
import { _DiamondProxyFallback } from './fallback/_DiamondProxyFallback.sol';
import { _DiamondProxyReadable } from './readable/_DiamondProxyReadable.sol';
import { _DiamondProxyWritable } from './writable/_DiamondProxyWritable.sol';
import { _ISolidstateDiamondProxy } from './_ISolidstateDiamondProxy.sol';

abstract contract _SolidstateDiamondProxy is
    _ISolidstateDiamondProxy,
    _DiamondProxy,
    _DiamondProxyFallback,
    _DiamondProxyReadable,
    _DiamondProxyWritable
{
    /**
     * @inheritdoc _DiamondProxyFallback
     */
    function _getImplementation()
        internal
        view
        virtual
        override(_DiamondProxy, _DiamondProxyFallback)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
