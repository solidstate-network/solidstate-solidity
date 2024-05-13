// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SolidStateERC20 } from './SolidStateERC20.sol';

contract SolidStateERC20Mock is SolidStateERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 supply
    ) {
        _setName(name);
        _setSymbol(symbol);
        _setDecimals(decimals);

        _mint(msg.sender, supply);
    }

    function __mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

    function __burn(address account, uint256 amount) external {
        _burn(account, amount);
    }
}
