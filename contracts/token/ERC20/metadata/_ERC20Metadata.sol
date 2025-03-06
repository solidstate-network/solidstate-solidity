// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC20Metadata } from './_IERC20Metadata.sol';
import { ERC20MetadataStorage } from './ERC20MetadataStorage.sol';

/**
 * @title ERC20Metadata internal functions
 */
abstract contract _ERC20Metadata is _IERC20Metadata {
    /**
     * @notice return token name
     * @return token name
     */
    function _name() internal view virtual returns (string memory) {
        return ERC20MetadataStorage.layout().name;
    }

    /**
     * @notice return token symbol
     * @return token symbol
     */
    function _symbol() internal view virtual returns (string memory) {
        return ERC20MetadataStorage.layout().symbol;
    }

    /**
     * @notice return token decimals, generally used only for display purposes
     * @return token decimals
     */
    function _decimals() internal view virtual returns (uint8) {
        return ERC20MetadataStorage.layout().decimals;
    }

    function _setName(string memory name) internal virtual {
        ERC20MetadataStorage.layout().name = name;
    }

    function _setSymbol(string memory symbol) internal virtual {
        ERC20MetadataStorage.layout().symbol = symbol;
    }

    function _setDecimals(uint8 decimals) internal virtual {
        ERC20MetadataStorage.layout().decimals = decimals;
    }
}
