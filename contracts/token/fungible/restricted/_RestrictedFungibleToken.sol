// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC1404 } from '../../../interfaces/IERC1404.sol';
import { _FungibleToken } from '../_FungibleToken.sol';
import { _IRestrictedFungibleToken } from './_IRestrictedFungibleToken.sol';
import { ERC20Storage } from '../../../storage/ERC20Storage.sol';

/**
 * @title Base ERC1404 internal functions
 */
abstract contract _RestrictedFungibleToken is
    _IRestrictedFungibleToken,
    _FungibleToken
{
    /**
     * @notice define restriction codes and their associated messages
     * @param restrictionCodes list of restriction codes whose messages to set
     * @param restrictionMessages list of restriction messages
     */
    function _setRestrictions(
        uint8[] memory restrictionCodes,
        string[] memory restrictionMessages
    ) internal {
        if (restrictionCodes.length != restrictionMessages.length)
            revert RestrictedFungibleToken__ArrayLengthMismatch();

        mapping(uint8 => string) storage restrictions = ERC20Storage
            .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
            .erc1404RestrictionMessages;

        unchecked {
            for (uint256 i; i < restrictionCodes.length; i++) {
                restrictions[restrictionCodes[i]] = restrictionMessages[i];
            }
        }
    }

    /**
     * @notice query the restriction code for a proposed transfer
     * @param from owner of tokens to be transferred
     * @param to beneficiary of transfer
     * @param amount quantity of tokens transferred
     * @return restrictionCode restriction code for transfer (0 if no restriction exists)
     */
    function _detectTransferRestriction(
        address from,
        address to,
        uint256 amount
    ) internal view virtual returns (uint8 restrictionCode) {
        return 0;
    }

    /**
     * @notice query the restriction message for a given restriction code
     * @param restrictionCode restriction code whose message to query
     * @return message restriction message
     */
    function _messageForTransferRestriction(
        uint8 restrictionCode
    ) internal view virtual returns (string memory message) {
        message = ERC20Storage
            .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
            .erc1404RestrictionMessages[restrictionCode];
    }

    /**
     * @notice ERC20 hook: detect and handle transfer restriction
     * @inheritdoc _FungibleToken
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        uint8 restrictionCode = _detectTransferRestriction(from, to, amount);

        if (restrictionCode != 0) {
            revert(_messageForTransferRestriction(restrictionCode));
        }
    }
}
