// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SolidstateERC20 } from '../ERC20/SolidstateERC20.sol';
import { _SolidstateERC20 } from '../ERC20/_SolidstateERC20.sol';
import { _ERC20Base } from '../ERC20/base/_ERC20Base.sol';
import { ERC1404Base } from './base/ERC1404Base.sol';
import { ISolidstateERC1404 } from './ISolidstateERC1404.sol';
import { _SolidstateERC1404 } from './_SolidstateERC1404.sol';

/**
 * @title Solidstate ERC1404 implementation, including recommended ERC20 extensions
 */
abstract contract SolidstateERC1404 is
    ISolidstateERC1404,
    _SolidstateERC1404,
    SolidstateERC20,
    ERC1404Base
{
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(_SolidstateERC1404, ERC1404Base, _ERC20Base) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
