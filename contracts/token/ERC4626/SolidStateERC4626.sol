// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20MetadataInternal } from '../ERC20/metadata/ERC20MetadataInternal.sol';
import { ERC20PermitInternal } from '../ERC20/permit/ERC20PermitInternal.sol';
import { SolidStateERC20 } from '../ERC20/SolidStateERC20.sol';
import { ERC4626Base } from './base/ERC4626Base.sol';
import { ISolidStateERC4626 } from './ISolidStateERC4626.sol';

/**
 * @title SolidState ERC4626 implementation, including recommended ERC20 extensions
 */
abstract contract SolidStateERC4626 is
    ISolidStateERC4626,
    ERC4626Base,
    SolidStateERC20
{
    function _setName(
        string memory name
    ) internal virtual override(ERC20MetadataInternal, SolidStateERC20) {
        super._setName(name);
    }
}
