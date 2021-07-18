// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC1155Enumerable {
    function totalSupply (uint id) external view returns (uint);

    function totalHolders (uint id) external view returns (uint);

    function accountsByToken (uint id) external view returns (address[] memory);

    function tokensByAccount (address account) external view returns (uint[] memory);
}
