// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20Base } from '../base/ERC20Base.sol';
import { ERC20Extended } from './ERC20Extended.sol';

contract ERC20ExtendedMock is ERC20Base, ERC20Extended {
    function __mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

    function __burn(address account, uint256 amount) external {
        _burn(account, amount);
    }
}
