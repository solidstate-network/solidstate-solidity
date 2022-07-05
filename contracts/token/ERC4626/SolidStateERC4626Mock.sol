// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { SolidStateERC4626 } from './SolidStateERC4626.sol';
import { ERC4626BaseStorage } from './base/ERC4626BaseStorage.sol';

contract SolidStateERC4626Mock is SolidStateERC4626 {
    using ERC4626BaseStorage for ERC4626BaseStorage.Layout;

    event AfterDepositCheck(
        address receiver,
        uint256 assetAmount,
        uint256 shareAmount
    );
    event BeforeWithdrawCheck(
        address owner,
        uint256 assetAmount,
        uint256 shareAmount
    );

    constructor(address asset) {
        ERC4626BaseStorage.Layout storage ERC4626Layout = ERC4626BaseStorage
            .layout();

        ERC4626Layout.asset = asset;
    }

    function _totalAssets() internal view override returns (uint256) {
        return _totalSupply();
    }

    function _afterDeposit(
        address receiver,
        uint256 assetAmount,
        uint256 shareAmount
    ) internal override {
        super._afterDeposit(receiver, assetAmount, shareAmount);
        emit AfterDepositCheck(receiver, assetAmount, shareAmount);
    }

    function _beforeWithdraw(
        address owner,
        uint256 assetAmount,
        uint256 shareAmount
    ) internal override {
        super._beforeWithdraw(owner, assetAmount, shareAmount);
        emit BeforeWithdrawCheck(owner, assetAmount, shareAmount);
    }

    function __mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

    function __burn(address account, uint256 amount) external {
        _burn(account, amount);
    }
}
