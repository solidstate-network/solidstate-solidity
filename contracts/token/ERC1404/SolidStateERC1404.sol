// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SolidStateERC20 } from '../ERC20/SolidStateERC20.sol';
import { ERC20BaseInternal } from '../ERC20/base/ERC20BaseInternal.sol';
import { ERC1404Base } from './base/ERC1404Base.sol';
import { ISolidStateERC1404 } from './ISolidStateERC1404.sol';

/**
 * @title SolidState ERC1404 implementation, including recommended ERC20 extensions
 */
abstract contract SolidStateERC1404 is
    ISolidStateERC1404,
    ERC1404Base,
    SolidStateERC20
{
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC1404Base, ERC20BaseInternal) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
