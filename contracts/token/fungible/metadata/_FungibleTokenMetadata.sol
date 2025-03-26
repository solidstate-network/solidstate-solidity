// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IFungibleTokenMetadata } from './_IFungibleTokenMetadata.sol';
import { ERC20Storage } from '../../../storage/ERC20Storage.sol';

/**
 * @title FungibleTokenMetadata internal functions
 */
abstract contract _FungibleTokenMetadata is _IFungibleTokenMetadata {
    /**
     * @notice return token name
     * @return token name
     */
    function _name() internal view virtual returns (string memory) {
        return ERC20Storage.layout(ERC20Storage.DEFAULT_STORAGE_SLOT).name;
    }

    /**
     * @notice return token symbol
     * @return token symbol
     */
    function _symbol() internal view virtual returns (string memory) {
        return ERC20Storage.layout(ERC20Storage.DEFAULT_STORAGE_SLOT).symbol;
    }

    /**
     * @notice return token decimals, generally used only for display purposes
     * @return token decimals
     */
    function _decimals() internal view virtual returns (uint8) {
        return ERC20Storage.layout(ERC20Storage.DEFAULT_STORAGE_SLOT).decimals;
    }

    function _setName(string memory name) internal virtual {
        ERC20Storage.layout(ERC20Storage.DEFAULT_STORAGE_SLOT).name = name;
    }

    function _setSymbol(string memory symbol) internal virtual {
        ERC20Storage.layout(ERC20Storage.DEFAULT_STORAGE_SLOT).symbol = symbol;
    }

    function _setDecimals(uint8 decimals) internal virtual {
        ERC20Storage
            .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
            .decimals = decimals;
    }
}
