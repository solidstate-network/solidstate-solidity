// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20Metadata } from './ERC20Metadata.sol';

contract ERC20MetadataMock is ERC20Metadata {
    constructor(string memory name, string memory symbol, uint8 decimals) {
        _setName(name);
        _setSymbol(symbol);
        _setDecimals(decimals);
    }
}
