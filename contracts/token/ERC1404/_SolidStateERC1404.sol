// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _SolidStateERC20 } from '../ERC20/_SolidStateERC20.sol';
import { _ERC20Base } from '../ERC20/base/_ERC20Base.sol';
import { _ERC1404Base } from './base/_ERC1404Base.sol';
import { _ISolidStateERC1404 } from './_ISolidStateERC1404.sol';

abstract contract _SolidStateERC1404 is
    _ISolidStateERC1404,
    _SolidStateERC20,
    _ERC1404Base
{
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(_ERC1404Base, _ERC20Base) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
