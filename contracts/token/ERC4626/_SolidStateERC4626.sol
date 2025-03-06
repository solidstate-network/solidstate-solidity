// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC20Metadata } from '../ERC20/metadata/_ERC20Metadata.sol';
import { _SolidStateERC20 } from '../ERC20/_SolidStateERC20.sol';
import { _ERC4626Base } from './base/_ERC4626Base.sol';
import { _ISolidStateERC4626 } from './_ISolidStateERC4626.sol';

abstract contract _SolidStateERC4626 is
    _ISolidStateERC4626,
    _SolidStateERC20,
    _ERC4626Base
{
    function _setName(
        string memory name
    ) internal virtual override(_ERC20Metadata, _SolidStateERC20) {
        super._setName(name);
    }
}
