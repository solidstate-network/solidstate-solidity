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
        require(
            assetAmount <= _maxDeposit(receiver),
            'ERC4626: maximum amount exceeded'
        );

        shareAmount = _previewDeposit(assetAmount);

        _deposit(msg.sender, receiver, assetAmount, shareAmount);
    }

    function _mint(uint256 shareAmount, address receiver)
        internal
        virtual
        returns (uint256 assetAmount)
    {
        require(
            shareAmount <= _maxMint(receiver),
            'ERC4626: maximum amount exceeded'
        );

        assetAmount = _previewMint(shareAmount);

        _deposit(msg.sender, receiver, assetAmount, shareAmount);
    }

    function _withdraw(
        uint256 assetAmount,
        address receiver,
        address owner
    ) internal virtual returns (uint256 shareAmount) {
        require(
            assetAmount <= _maxWithdraw(owner),
            'ERC4626: maximum amount exceeded'
        );

        shareAmount = _previewWithdraw(assetAmount);

        _withdraw(msg.sender, receiver, owner, assetAmount, shareAmount);
    }

    function _redeem(
        uint256 shareAmount,
        address receiver,
        address owner
    ) internal virtual returns (uint256 assetAmount) {
        require(
            shareAmount <= _maxRedeem(owner),
            'ERC4626: maximum amount exceeded'
        );

        assetAmount = _previewRedeem(shareAmount);

        _withdraw(msg.sender, receiver, owner, assetAmount, shareAmount);
    }

    /**
     * @notice ERC4626 hook, called deposit and mint actions
     * @dev function should be overridden and new implementation must call super
     * @param receiver recipient of shares resulting from deposit
     * @param assetAmount quantity of assets being deposited
     * @param shareAmount quantity of shares being minted
     */
    function _afterDeposit(
        address receiver,
        uint256 assetAmount,
        uint256 shareAmount
    ) internal virtual {}

    /**
     * @notice ERC4626 hook, called before withdraw and redeem actions
     * @dev function should be overridden and new implementation must call super
     * @param owner holder of shares to be redeemed
     * @param assetAmount quantity of assets being withdrawn
     * @param shareAmount quantity of shares being redeemed
     */
    function _beforeWithdraw(
        address owner,
        uint256 assetAmount,
        uint256 shareAmount
    ) internal virtual {}

    function _deposit(
        address caller,
        address receiver,
        uint256 assetAmount,
        uint256 shareAmount
    ) private {
        IERC20(_asset()).safeTransferFrom(caller, address(this), assetAmount);

        _mint(receiver, shareAmount);

        _afterDeposit(receiver, assetAmount, shareAmount);

        emit Deposit(caller, receiver, assetAmount, shareAmount);
    }

    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assetAmount,
        uint256 shareAmount
    ) private {
        if (caller != owner) {
            uint256 allowance = _allowance(owner, caller);

            require(
                allowance >= shareAmount,
                'ERC4626: share amount exceeds allowance'
            );

            unchecked {
                _approve(owner, caller, allowance - shareAmount);
            }
        }

        _beforeWithdraw(owner, assetAmount, shareAmount);

        _burn(owner, shareAmount);

        IERC20(_asset()).safeTransfer(receiver, assetAmount);

        emit Withdraw(caller, receiver, owner, assetAmount, shareAmount);
    }
}
