// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC20MetadataStorage } from '../metadata/ERC20MetadataStorage.sol';
import { ERC20Permit } from './ERC20Permit.sol';

contract ERC20PermitMock is ERC20Permit {
    using ERC20MetadataStorage for ERC20MetadataStorage.Layout;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals
    ) {
        ERC20MetadataStorage.Layout storage l = ERC20MetadataStorage.layout();

        l.setName(name);
        l.setSymbol(symbol);
        l.setDecimals(decimals);
    }

    function __mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

    function __burn(address account, uint256 amount) external {
        _burn(account, amount);
    }
}
