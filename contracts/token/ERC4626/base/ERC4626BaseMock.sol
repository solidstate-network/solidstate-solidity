// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC4626Base } from './ERC4626Base.sol';
import { ERC4626BaseStorage } from './ERC4626BaseStorage.sol';
import { ERC20MetadataStorage } from '../../ERC20/metadata/ERC20MetadataStorage.sol';

contract ERC4626BaseMock is ERC4626Base {
    using ERC20MetadataStorage for ERC20MetadataStorage.Layout;
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

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        address asset
    ) {
        {
            ERC20MetadataStorage.Layout storage l = ERC20MetadataStorage
                .layout();

            l.setName(name);
            l.setSymbol(symbol);
            l.setDecimals(decimals);
        }

        {
            ERC4626BaseStorage.Layout storage ERC4626Layout = ERC4626BaseStorage
                .layout();

            ERC4626Layout.asset = asset;
        }
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
