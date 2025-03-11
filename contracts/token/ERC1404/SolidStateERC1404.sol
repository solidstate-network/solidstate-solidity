// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SolidStateERC20 } from '../ERC20/SolidStateERC20.sol';
import { _SolidStateERC20 } from '../ERC20/_SolidStateERC20.sol';
import { _ERC20Base } from '../ERC20/base/_ERC20Base.sol';
import { ERC1404Base } from './base/ERC1404Base.sol';
import { ISolidStateERC1404 } from './ISolidStateERC1404.sol';
import { _SolidStateERC1404 } from './_SolidStateERC1404.sol';

/**
 * @title SolidState ERC1404 implementation, including recommended ERC20 extensions
 */
abstract contract SolidStateERC1404 is
    ISolidStateERC1404,
    _SolidStateERC1404,
    SolidStateERC20,
    ERC1404Base
{
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(_SolidStateERC1404, ERC1404Base, _ERC20Base) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
