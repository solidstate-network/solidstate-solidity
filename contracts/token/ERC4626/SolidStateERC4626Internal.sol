// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20MetadataInternal } from '../ERC20/metadata/ERC20MetadataInternal.sol';
import { SolidStateERC20Internal } from '../ERC20/SolidStateERC20Internal.sol';
import { ERC4626BaseInternal } from './base/ERC4626BaseInternal.sol';
import { ISolidStateERC4626Internal } from './ISolidStateERC4626Internal.sol';

abstract contract SolidStateERC4626Internal is
    ISolidStateERC4626Internal,
    SolidStateERC20Internal,
    ERC4626BaseInternal
{
    function _setName(
        string memory name
    )
        internal
        virtual
        override(ERC20MetadataInternal, SolidStateERC20Internal)
    {
        super._setName(name);
    }
}
