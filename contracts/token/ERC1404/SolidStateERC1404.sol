// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SolidStateERC20 } from '../ERC20/SolidStateERC20.sol';
import { SolidStateERC20Internal } from '../ERC20/SolidStateERC20Internal.sol';
import { ERC20BaseInternal } from '../ERC20/base/ERC20BaseInternal.sol';
import { ERC1404Base } from './base/ERC1404Base.sol';
import { ISolidStateERC1404 } from './ISolidStateERC1404.sol';
import { SolidStateERC1404Internal } from './SolidStateERC1404Internal.sol';

/**
 * @title Solidstate ERC1404 implementation, including recommended ERC20 extensions
 */
abstract contract SolidStateERC1404 is
    ISolidStateERC1404,
    SolidStateERC1404Internal,
    SolidStateERC20,
    ERC1404Base
{
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    )
        internal
        virtual
        override(SolidStateERC1404Internal, ERC1404Base, ERC20BaseInternal)
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function _setName(
        string memory name
    ) internal virtual override(SolidStateERC20, SolidStateERC20Internal) {
        super._setName(name);
    }
}
