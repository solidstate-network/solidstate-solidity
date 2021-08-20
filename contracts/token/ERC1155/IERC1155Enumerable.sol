// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title ERC1155 enumerable and aggregate function interface
 */
interface IERC1155Enumerable {
    /**
     * @notice query total minted supply of given token
     * @param id token id to query
     * @return token supply
     */
    function totalSupply (uint id) external view returns (uint);

    /**
     * @notice query total number of holders for given token
     * @param id token id to query
     * @return quantity of holders
     */
    function totalHolders (uint id) external view returns (uint);

    /**
     * @notice query holders of given token
     * @param id token id to query
     * @return list of holder addresses
     */
    function accountsByToken (uint id) external view returns (address[] memory);

    /**
     * @notice query tokens held by given address
     * @param account address to query
     * @return list of token ids
     */
    function tokensByAccount (address account) external view returns (uint[] memory);
}
