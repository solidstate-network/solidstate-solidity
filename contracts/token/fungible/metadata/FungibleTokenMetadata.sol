// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20MetadataStandard } from '../../../interfaces/IERC20MetadataStandard.sol';
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
     * @inheritdoc IERC20MetadataStandard
     */
    function name() external view returns (string memory) {
        return _name();
    }

    /**
     * @inheritdoc IERC20MetadataStandard
     */
    function symbol() external view returns (string memory) {
        return _symbol();
    }

    /**
     * @inheritdoc IERC20MetadataStandard
     */
    function decimals() external view returns (uint8) {
        return _decimals();
    }
}
