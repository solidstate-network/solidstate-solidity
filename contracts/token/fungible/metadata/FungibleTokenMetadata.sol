// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC20Metadata } from '../../../interfaces/IERC20Metadata.sol';
import { IFungibleTokenMetadata } from './IFungibleTokenMetadata.sol';
import { _FungibleTokenMetadata } from './_FungibleTokenMetadata.sol';

/**
 * @title ERC20 metadata extensions
 */
abstract contract FungibleTokenMetadata is
    IFungibleTokenMetadata,
    _FungibleTokenMetadata
{
    /**
     * @inheritdoc IERC20Metadata
     */
    function name() external view returns (string memory) {
        return _name();
    }

    /**
     * @inheritdoc IERC20Metadata
     */
    function symbol() external view returns (string memory) {
        return _symbol();
    }

    /**
     * @inheritdoc IERC20Metadata
     */
    function decimals() external view returns (uint8) {
        return _decimals();
    }
}
