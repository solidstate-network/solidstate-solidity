// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { SolidStateERC1404 } from './SolidStateERC1404.sol';
import { ERC1404BaseStorage } from './base/ERC1404BaseStorage.sol';

contract SolidStateERC1404Mock is SolidStateERC1404 {
    using ERC1404BaseStorage for ERC1404BaseStorage.Layout;

    constructor(uint8[] memory errorCodes, string[] memory errorMessages) {
        ERC1404BaseStorage.layout().setRestrictions(errorCodes, errorMessages);
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
