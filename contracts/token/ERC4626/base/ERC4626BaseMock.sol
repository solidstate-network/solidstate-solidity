// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC4626Base } from './ERC4626Base.sol';
import { ERC4626BaseStorage } from './ERC4626BaseStorage.sol';

contract ERC4626BaseMock is ERC4626Base {
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

    function _totalAssets() internal pure override returns (uint256) {
        return 2;
    }

    function _maxDeposit(address) internal pure override returns (uint256) {
        return type(uint256).max - 1;
    }

    function _maxMint(address) internal pure override returns (uint256) {
        return type(uint256).max - 1;
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

    function __afterDeposit(
        address receiver,
        uint256 assetAmount,
        uint256 shareAmount
    ) external {
        _afterDeposit(receiver, assetAmount, shareAmount);
    }

    function __beforeWithdraw(
        address owner,
        uint256 assetAmount,
        uint256 shareAmount
    ) external {
        _beforeWithdraw(owner, assetAmount, shareAmount);
    }

    function __mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
