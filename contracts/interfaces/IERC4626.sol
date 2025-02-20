// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20Metadata } from '../token/ERC20/metadata/IERC20Metadata.sol';
import { IERC20 } from './IERC20.sol';
import { IERC4626Internal } from './IERC4626Internal.sol';

/**
 * @title ERC4626 interface
 * @dev see https://eips.ethereum.org/EIPS/eip-4626
 */
interface IERC4626 is IERC4626Internal, IERC20, IERC20Metadata {
    /**
     * @notice get the address of the base token used for vault accountin purposes
     * @return base token address
     */
    function asset() external view returns (address);

    /**
     * @notice get the total quantity of the base asset currently managed by the vault
     * @return total managed asset amount
     */
    function totalAssets() external view returns (uint256);

    /**
     * @notice calculate the quantity of shares received in exchange for a given quantity of assets, not accounting for slippage
     * @param assetAmount quantity of assets to convert
     * @return shareAmount quantity of shares calculated
     */
    function convertToShares(
        uint256 assetAmount
    ) external view returns (uint256 shareAmount);

    /**
     * @notice calculate the quantity of assets received in exchange for a given quantity of shares, not accounting for slippage
     * @param shareAmount quantity of shares to convert
     * @return assetAmount quantity of assets calculated
     */
    function convertToAssets(
        uint256 shareAmount
    ) external view returns (uint256 assetAmount);

    /**
     * @notice calculate the maximum quantity of base assets which may be deposited on behalf of given receiver
     * @param receiver recipient of shares resulting from deposit
     * @return maxAssets maximum asset deposit amount
     */
    function maxDeposit(
        address receiver
    ) external view returns (uint256 maxAssets);

    /**
     * @notice calculate the maximum quantity of shares which may be minted on behalf of given receiver
     * @param receiver recipient of shares resulting from deposit
     * @return maxShares maximum share mint amount
     */
    function maxMint(
        address receiver
    ) external view returns (uint256 maxShares);

    /**
     * @notice calculate the maximum quantity of base assets which may be withdrawn by given holder
     * @param owner holder of shares to be redeemed
     * @return maxAssets maximum asset mint amount
     */
    function maxWithdraw(
        address owner
    ) external view returns (uint256 maxAssets);

    /**
     * @notice calculate the maximum quantity of shares which may be redeemed by given holder
     * @param owner holder of shares to be redeemed
     * @return maxShares maximum share redeem amount
     */
    function maxRedeem(address owner) external view returns (uint256 maxShares);

    /**
     * @notice simulate a deposit of given quantity of assets
     * @param assetAmount quantity of assets to deposit
     * @return shareAmount quantity of shares to mint
     */
    function previewDeposit(
        uint256 assetAmount
    ) external view returns (uint256 shareAmount);

    /**
     * @notice simulate a minting of given quantity of shares
     * @param shareAmount quantity of shares to mint
     * @return assetAmount quantity of assets to deposit
     */
    function previewMint(
        uint256 shareAmount
    ) external view returns (uint256 assetAmount);

    /**
     * @notice simulate a withdrawal of given quantity of assets
     * @param assetAmount quantity of assets to withdraw
     * @return shareAmount quantity of shares to redeem
     */
    function previewWithdraw(
        uint256 assetAmount
    ) external view returns (uint256 shareAmount);

    /**
     * @notice simulate a redemption of given quantity of shares
     * @param shareAmount quantity of shares to redeem
     * @return assetAmount quantity of assets to withdraw
     */
    function previewRedeem(
        uint256 shareAmount
    ) external view returns (uint256 assetAmount);

    /**
     * @notice execute a deposit of assets on behalf of given address
     * @param assetAmount quantity of assets to deposit
     * @param receiver recipient of shares resulting from deposit
     * @return shareAmount quantity of shares to mint
     */
    function deposit(
        uint256 assetAmount,
        address receiver
    ) external returns (uint256 shareAmount);

    /**
     * @notice execute a minting of shares on behalf of given address
     * @param shareAmount quantity of shares to mint
     * @param receiver recipient of shares resulting from deposit
     * @return assetAmount quantity of assets to deposit
     */
    function mint(
        uint256 shareAmount,
        address receiver
    ) external returns (uint256 assetAmount);

    /**
     * @notice execute a withdrawal of assets on behalf of given address
     * @param assetAmount quantity of assets to withdraw
     * @param receiver recipient of assets resulting from withdrawal
     * @param owner holder of shares to be redeemed
     * @return shareAmount quantity of shares to redeem
     */
    function withdraw(
        uint256 assetAmount,
        address receiver,
        address owner
    ) external returns (uint256 shareAmount);

    /**
     * @notice execute a redemption of shares on behalf of given address
     * @param shareAmount quantity of shares to redeem
     * @param receiver recipient of assets resulting from withdrawal
     * @param owner holder of shares to be redeemed
     * @return assetAmount quantity of assets to withdraw
     */
    function redeem(
        uint256 shareAmount,
        address receiver,
        address owner
    ) external returns (uint256 assetAmount);
}
