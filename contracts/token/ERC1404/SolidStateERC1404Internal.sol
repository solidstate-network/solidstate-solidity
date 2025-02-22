// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SolidStateERC20Internal } from '../ERC20/SolidStateERC20Internal.sol';
import { ERC20BaseInternal } from '../ERC20/base/ERC20BaseInternal.sol';
import { ERC1404BaseInternal } from './base/ERC1404BaseInternal.sol';
import { ISolidStateERC1404Internal } from './ISolidStateERC1404Internal.sol';

abstract contract SolidStateERC1404Internal is
    ISolidStateERC1404Internal,
    SolidStateERC20Internal,
    ERC1404BaseInternal
{
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC1404BaseInternal, ERC20BaseInternal) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
