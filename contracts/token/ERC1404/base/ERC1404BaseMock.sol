// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC1404Base } from './ERC1404Base.sol';
import { ERC1404BaseStorage } from './ERC1404BaseStorage.sol';

contract ERC1404BaseMock is ERC1404Base {
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
