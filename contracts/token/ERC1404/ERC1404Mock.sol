// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC1404 } from './ERC1404.sol';
import { ERC1404Storage } from './base/ERC1404Storage.sol';

contract ERC1404Mock is ERC1404 {
    using ERC1404Storage for ERC1404Storage.Layout;

    constructor(uint8[] memory errorCodes, string[] memory errorMessages) {
        ERC1404Storage.layout().setRestrictions(errorCodes, errorMessages);
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
