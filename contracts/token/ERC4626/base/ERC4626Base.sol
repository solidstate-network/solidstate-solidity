// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC4626 } from '../../../interfaces/IERC4626.sol';
import { IERC4626 } from '../../../interfaces/IERC4626.sol';
import { ERC20Base } from '../../ERC20/base/ERC20Base.sol';
import { ERC20Metadata } from '../../ERC20/metadata/ERC20Metadata.sol';
import { IERC4626Base } from './IERC4626Base.sol';
import { ERC4626BaseInternal } from './ERC4626BaseInternal.sol';

/**
 * @title Base ERC4626 implementation
 */
abstract contract ERC4626Base is
    IERC4626Base,
    ERC4626BaseInternal,
    ERC20Base,
    ERC20Metadata
{
    /**
     * @inheritdoc IERC4626
     */
    function asset() external view returns (address) {
        return _asset();
    }

    /**
     * @inheritdoc IERC4626
     */
    function totalAssets() external view returns (uint256) {
        return _totalAssets();
    }

    /**
     * @inheritdoc IERC4626
     */
    function convertToShares(
        uint256 assetAmount
    ) external view returns (uint256 shareAmount) {
        shareAmount = _convertToShares(assetAmount);
    }

    /**
     * @inheritdoc IERC4626
     */
    function convertToAssets(
        uint256 shareAmount
    ) external view returns (uint256 assetAmount) {
        assetAmount = _convertToAssets(shareAmount);
    }

    /**
     * @inheritdoc IERC4626
     */
    function maxDeposit(
        address receiver
    ) external view returns (uint256 maxAssets) {
        maxAssets = _maxDeposit(receiver);
    }

    /**
     * @inheritdoc IERC4626
     */
    function maxMint(
        address receiver
    ) external view returns (uint256 maxShares) {
        maxShares = _maxMint(receiver);
    }

    /**
     * @inheritdoc IERC4626
     */
    function maxWithdraw(
        address owner
    ) external view returns (uint256 maxAssets) {
        maxAssets = _maxWithdraw(owner);
    }

    /**
     * @inheritdoc IERC4626
     */
    function maxRedeem(
        address owner
    ) external view returns (uint256 maxShares) {
        maxShares = _maxRedeem(owner);
    }

    /**
     * @inheritdoc IERC4626
     */
    function previewDeposit(
        uint256 assetAmount
    ) external view returns (uint256 shareAmount) {
        shareAmount = _previewDeposit(assetAmount);
    }

    /**
     * @inheritdoc IERC4626
     */
    function previewMint(
        uint256 shareAmount
    ) external view returns (uint256 assetAmount) {
        assetAmount = _previewMint(shareAmount);
    }

    /**
     * @inheritdoc IERC4626
     */
    function previewWithdraw(
        uint256 assetAmount
    ) external view returns (uint256 shareAmount) {
        shareAmount = _previewWithdraw(assetAmount);
    }

    /**
     * @inheritdoc IERC4626
     */
    function previewRedeem(
        uint256 shareAmount
    ) external view returns (uint256 assetAmount) {
        assetAmount = _previewRedeem(shareAmount);
    }

    /**
     * @inheritdoc IERC4626
     */
    function deposit(
        uint256 assetAmount,
        address receiver
    ) external returns (uint256 shareAmount) {
        shareAmount = _deposit(assetAmount, receiver);
    }

    /**
     * @inheritdoc IERC4626
     */
    function mint(
        uint256 shareAmount,
        address receiver
    ) external returns (uint256 assetAmount) {
        assetAmount = _mint(shareAmount, receiver);
    }

    /**
     * @inheritdoc IERC4626
     */
    function withdraw(
        uint256 assetAmount,
        address receiver,
        address owner
    ) external returns (uint256 shareAmount) {
        shareAmount = _withdraw(assetAmount, receiver, owner);
    }

    /**
     * @inheritdoc IERC4626
     */
    function redeem(
        uint256 shareAmount,
        address receiver,
        address owner
    ) external returns (uint256 assetAmount) {
        assetAmount = _redeem(shareAmount, receiver, owner);
    }
}
