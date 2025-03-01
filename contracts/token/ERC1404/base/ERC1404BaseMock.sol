// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC1404Base } from './ERC1404Base.sol';

contract ERC1404BaseMock is ERC1404Base {
    struct InvalidTransfer {
        address sender;
        address receiver;
        uint256 amount;
        uint8 restrictionCode;
    }

    InvalidTransfer private _invalidTransfer;

    function setRestrictions(
        uint8[] memory restrictionCodes,
        string[] memory restrictionMessages
    ) external {
        _setRestrictions(restrictionCodes, restrictionMessages);
    }

    function _detectTransferRestriction(
        address sender,
        address receiver,
        uint256 amount
    ) internal view override returns (uint8) {
        if (
            sender == _invalidTransfer.sender &&
            receiver == _invalidTransfer.receiver &&
            amount == _invalidTransfer.amount
        ) {
            return _invalidTransfer.restrictionCode;
        } else {
            return 0;
        }
    }

    function __mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

    function __burn(address account, uint256 amount) external {
        _burn(account, amount);
    }

    function setInvalidTransfer(
        address sender,
        address receiver,
        uint256 amount,
        uint8 restrictionCode
    ) external {
        _invalidTransfer = InvalidTransfer(
            sender,
            receiver,
            amount,
            restrictionCode
        );
    }
}
