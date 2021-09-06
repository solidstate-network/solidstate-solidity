// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC20 } from '../ERC20/ERC20.sol';
import { ERC20BaseInternal } from '../ERC20/base/ERC20BaseInternal.sol';
import { ERC1404Base } from './base/ERC1404Base.sol';

/**
 * @title SolidState ERC1404 implementation, including recommended ERC20 extensions
 */
abstract contract ERC1404 is ERC1404Base, ERC20 {
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC1404Base, ERC20BaseInternal) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
