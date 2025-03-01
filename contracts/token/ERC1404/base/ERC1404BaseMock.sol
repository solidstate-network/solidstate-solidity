// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC1404Base } from './ERC1404Base.sol';

contract ERC1404BaseMock is ERC1404Base {
    function setRestrictions(
        uint8[] memory restrictionCodes,
        string[] memory restrictionMessages
    ) external {
        _setRestrictions(restrictionCodes, restrictionMessages);
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
