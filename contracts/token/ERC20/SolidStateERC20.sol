// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20Base } from './base/ERC20Base.sol';
import { ERC20Extended } from './extended/ERC20Extended.sol';
import { ERC20Metadata } from './metadata/ERC20Metadata.sol';
import { ERC20MetadataInternal } from './metadata/ERC20MetadataInternal.sol';
import { ERC20Permit } from './permit/ERC20Permit.sol';
import { ERC20PermitInternal } from './permit/ERC20PermitInternal.sol';
import { ISolidStateERC20 } from './ISolidStateERC20.sol';
import { SolidStateERC20Internal } from './SolidStateERC20Internal.sol';

/**
 * @title SolidState ERC20 implementation, including recommended extensions
 */
abstract contract SolidStateERC20 is
    ISolidStateERC20,
    SolidStateERC20Internal,
    ERC20Base,
    ERC20Extended,
    ERC20Metadata,
    ERC20Permit
{
    function _setName(
        string memory name
    )
        internal
        virtual
        override(
            SolidStateERC20Internal,
            ERC20MetadataInternal,
            ERC20PermitInternal
        )
    {
        super._setName(name);
    }
}
