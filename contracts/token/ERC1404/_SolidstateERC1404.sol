// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _SolidstateFungibleToken } from '../fungible/_SolidstateFungibleToken.sol';
import { _FungibleTokenBase } from '../fungible/base/_FungibleTokenBase.sol';
import { _ERC1404Base } from './base/_ERC1404Base.sol';
import { _ISolidstateERC1404 } from './_ISolidstateERC1404.sol';

abstract contract _SolidstateERC1404 is
    _ISolidstateERC1404,
    _SolidstateFungibleToken,
    _ERC1404Base
{
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(_ERC1404Base, _FungibleTokenBase) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
