// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { SafeERC20 } from '../../../utils/SafeERC20.sol';
import { IERC20 } from '../../ERC20/IERC20.sol';
import { ERC20BaseInternal } from '../../ERC20/base/ERC20BaseInternal.sol';
import { IERC4626Internal } from '../IERC4626Internal.sol';
import { ERC4626BaseStorage } from './ERC4626BaseStorage.sol';

/**
 * @title Base ERC4626 internal functions_
 */
abstract contract ERC4626BaseInternal is IERC4626Internal, ERC20BaseInternal {
    using SafeERC20 for IERC20;

    function _asset() internal view virtual returns (address) {
        return ERC4626BaseStorage.layout().asset;
    }

    function _totalAssets() internal view virtual returns (uint256);

    function _convertToShares(uint256 assetAmount)
        internal
        view
        virtual
        returns (uint256 shareAmount)
    {
        uint256 supply = _totalSupply();
        shareAmount = supply == 0
            ? assetAmount
            : (assetAmount * supply) / _totalAssets();
    }

    function _convertToAssets(uint256 shareAmount)
        internal
        view
        virtual
        returns (uint256 assetAmount)
    {
        uint256 supply = _totalSupply();
        assetAmount = supply == 0
            ? shareAmount
            : (shareAmount * _totalAssets()) / supply;
    }

    function _maxDeposit(address)
        internal
        view
        virtual
        returns (uint256 maxAssets)
    {
        maxAssets = type(uint256).max;
    }

    function _maxMint(address)
        internal
        view
        virtual
        returns (uint256 maxShares)
    {
        maxShares = type(uint256).max;
    }

    function _maxWithdraw(address owner)
        internal
        view
        virtual
        returns (uint256 maxAssets)
    {
        maxAssets = _convertToAssets(_balanceOf(owner));
    }

    function _maxRedeem(address owner)
        internal
        view
        virtual
        returns (uint256 maxShares)
    {
        maxShares = _balanceOf(owner);
    }

    function _previewDeposit(uint256 assetAmount)
        internal
        view
        virtual
        returns (uint256 shareAmount)
    {
        shareAmount = _convertToShares(assetAmount);
    }

    function _previewMint(uint256 shareAmount)
        internal
        view
        virtual
        returns (uint256 assetAmount)
    {
        uint256 supply = _totalSupply();
        assetAmount = supply == 0
            ? shareAmount
            : (shareAmount * _totalAssets()) / supply;
    }

    function _previewWithdraw(uint256 assetAmount)
        internal
        view
        virtual
        returns (uint256 shareAmount)
    {
        uint256 supply = _totalSupply();
        shareAmount = supply == 0
            ? assetAmount
            : (assetAmount * supply) / _totalAssets();
    }

    function _previewRedeem(uint256 shareAmount)
        internal
        view
        virtual
        returns (uint256 assetAmount)
    {
        assetAmount = _convertToAssets(shareAmount);
    }

    function _deposit(uint256 assetAmount, address receiver)
        internal
        virtual
        returns (uint256 shareAmount)
    {
        shareAmount = _previewDeposit(assetAmount);

        IERC20(_asset()).safeTransferFrom(
            msg.sender,
            address(this),
            assetAmount
        );

        _mint(receiver, shareAmount);

        emit Deposit(msg.sender, receiver, assetAmount, shareAmount);
    }

    function _mint(uint256 shareAmount, address receiver)
        internal
        virtual
        returns (uint256 assetAmount)
    {
        assetAmount = _previewMint(shareAmount);

        IERC20(_asset()).safeTransferFrom(
            msg.sender,
            address(this),
            assetAmount
        );

        _mint(receiver, shareAmount);

        emit Deposit(msg.sender, receiver, assetAmount, shareAmount);
    }

    function _withdraw(
        uint256 assetAmount,
        address receiver,
        address owner
    ) internal virtual returns (uint256 shareAmount) {
        shareAmount = _previewWithdraw(assetAmount);

        if (msg.sender != owner) {
            uint256 allowance = _allowance(owner, msg.sender);

            require(
                allowance >= shareAmount,
                'ERC4626: share amount exceeds allowance'
            );

            unchecked {
                _approve(owner, msg.sender, allowance - shareAmount);
            }
        }

        _burn(owner, shareAmount);

        IERC20(_asset()).safeTransfer(receiver, assetAmount);

        emit Withdraw(msg.sender, receiver, owner, assetAmount, shareAmount);
    }

    function _redeem(
        uint256 shareAmount,
        address receiver,
        address owner
    ) internal virtual returns (uint256 assetAmount) {
        if (msg.sender != owner) {
            uint256 allowance = _allowance(owner, msg.sender);

            require(
                allowance >= shareAmount,
                'ERC4626: share amount exceeds allowance'
            );

            unchecked {
                _approve(owner, msg.sender, allowance - shareAmount);
            }
        }

        assetAmount = _previewRedeem(shareAmount);

        _burn(owner, shareAmount);

        IERC20(_asset()).safeTransfer(receiver, assetAmount);

        emit Withdraw(msg.sender, receiver, owner, assetAmount, shareAmount);
    }
}
