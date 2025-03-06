// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20MetadataStandard } from '../../../interfaces/IERC20MetadataStandard.sol';
import { IERC20Metadata } from './IERC20Metadata.sol';
import { _ERC20Metadata } from './_ERC20Metadata.sol';

/**
 * @title ERC20 metadata extensions
 */
abstract contract ERC20Metadata is IERC20Metadata, _ERC20Metadata {
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
