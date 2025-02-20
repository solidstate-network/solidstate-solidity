// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SolidStateERC1404 } from './SolidStateERC1404.sol';

contract SolidStateERC1404Mock is SolidStateERC1404 {
    constructor(uint8[] memory errorCodes, string[] memory errorMessages) {
        _setRestrictions(errorCodes, errorMessages);
    }

    function _detectTransferRestriction(
        address,
        address,
        uint256
    ) internal pure override returns (uint8) {
        return 0;
    }

    function __mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

    function __burn(address account, uint256 amount) external {
        _burn(account, amount);
    }
}
