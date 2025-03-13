// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SolidstateFungibleToken } from '../fungible/SolidstateFungibleToken.sol';
import { _SolidstateFungibleToken } from '../fungible/_SolidstateFungibleToken.sol';
import { _FungibleTokenBase } from '../fungible/base/_FungibleTokenBase.sol';
import { ERC1404Base } from './base/ERC1404Base.sol';
import { ISolidstateERC1404 } from './ISolidstateERC1404.sol';
import { _SolidstateERC1404 } from './_SolidstateERC1404.sol';

/**
 * @title Solidstate ERC1404 implementation, including recommended ERC20 extensions
 */
abstract contract SolidstateERC1404 is
    ISolidstateERC1404,
    _SolidstateERC1404,
    SolidstateFungibleToken,
    ERC1404Base
{
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    )
        internal
        virtual
        override(_SolidstateERC1404, ERC1404Base, _FungibleTokenBase)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
