// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { EnumerableMap } from '../../data/EnumerableMap.sol';
import { EnumerableSet } from '../../data/EnumerableSet.sol';
import { IERC721Receiver } from '../../interfaces/IERC721Receiver.sol';
import { _Introspectable } from '../../introspection/_Introspectable.sol';
import { ERC721Storage } from '../../storage/ERC721Storage.sol';
import { AddressUtils } from '../../utils/AddressUtils.sol';
import { MsgSenderTrick } from '../../utils/MsgSenderTrick.sol';
import { _INonFungibleToken } from './_INonFungibleToken.sol';

/**
 * @title Base NonFungibleToken internal functions
 */
abstract contract _NonFungibleToken is
    _INonFungibleToken,
    _Introspectable,
    MsgSenderTrick
{
    using AddressUtils for address;
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    using EnumerableSet for EnumerableSet.UintSet;

    function _balanceOf(
        address account
    ) internal view virtual returns (uint256) {
        if (account == address(0))
            revert NonFungibleToken__BalanceQueryZeroAddress();
        return
            ERC721Storage
                .layout(ERC721Storage.DEFAULT_STORAGE_SLOT)
                .holderTokens[account]
                .length();
    }

    function _ownerOf(uint256 tokenId) internal view virtual returns (address) {
        address owner = ERC721Storage
            .layout(ERC721Storage.DEFAULT_STORAGE_SLOT)
            .tokenOwners
            .get(tokenId);
        if (owner == address(0)) revert NonFungibleToken__InvalidOwner();
        return owner;
    }

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return
            ERC721Storage
                .layout(ERC721Storage.DEFAULT_STORAGE_SLOT)
                .tokenOwners
                .contains(tokenId);
    }

    function _getApproved(
        uint256 tokenId
    ) internal view virtual returns (address) {
        if (!_exists(tokenId)) revert NonFungibleToken__NonExistentToken();

        return
            ERC721Storage
                .layout(ERC721Storage.DEFAULT_STORAGE_SLOT)
                .tokenApprovals[tokenId];
    }

    function _isApprovedForAll(
        address account,
        address operator
    ) internal view virtual returns (bool) {
        return
            ERC721Storage
                .layout(ERC721Storage.DEFAULT_STORAGE_SLOT)
                .operatorApprovals[account][operator];
    }

    function _isApprovedOrOwner(
        address spender,
        uint256 tokenId
    ) internal view virtual returns (bool) {
        if (!_exists(tokenId)) revert NonFungibleToken__NonExistentToken();

        address owner = _ownerOf(tokenId);

        return (spender == owner ||
            _getApproved(tokenId) == spender ||
            _isApprovedForAll(owner, spender));
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        if (to == address(0)) revert NonFungibleToken__MintToZeroAddress();
        if (_exists(tokenId)) revert NonFungibleToken__TokenAlreadyMinted();

        _beforeTokenTransfer(address(0), to, tokenId);

        ERC721Storage.Layout storage $ = ERC721Storage.layout(
            ERC721Storage.DEFAULT_STORAGE_SLOT
        );

        $.holderTokens[to].add(tokenId);
        $.tokenOwners.set(tokenId, to);

        emit Transfer(address(0), to, tokenId);
    }

    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, '');
    }

    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal virtual {
        _mint(to, tokenId);
        if (!_checkOnERC721Received(address(0), to, tokenId, data))
            revert NonFungibleToken__ERC721ReceiverNotImplemented();
    }

    function _burn(uint256 tokenId) internal virtual {
        address owner = _ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        ERC721Storage.Layout storage $ = ERC721Storage.layout(
            ERC721Storage.DEFAULT_STORAGE_SLOT
        );

        $.holderTokens[owner].remove(tokenId);
        $.tokenOwners.remove(tokenId);

        $.tokenApprovals[tokenId] = address(0);

        emit Approval(owner, address(0), tokenId);
        emit Transfer(owner, address(0), tokenId);
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        address owner = _ownerOf(tokenId);

        if (owner != from) revert NonFungibleToken__NotTokenOwner();
        if (to == address(0)) revert NonFungibleToken__TransferToZeroAddress();

        _beforeTokenTransfer(from, to, tokenId);

        ERC721Storage.Layout storage $ = ERC721Storage.layout(
            ERC721Storage.DEFAULT_STORAGE_SLOT
        );

        $.holderTokens[from].remove(tokenId);
        $.holderTokens[to].add(tokenId);
        $.tokenOwners.set(tokenId, to);
        $.tokenApprovals[tokenId] = address(0);

        emit Approval(owner, address(0), tokenId);
        emit Transfer(from, to, tokenId);
    }

    function _transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        _handleTransferMessageValue(from, to, tokenId, msg.value);
        if (!_isApprovedOrOwner(_msgSender(), tokenId))
            revert NonFungibleToken__NotOwnerOrApproved();
        _transfer(from, to, tokenId);
    }

    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal virtual {
        _transfer(from, to, tokenId);
        if (!_checkOnERC721Received(from, to, tokenId, data))
            revert NonFungibleToken__ERC721ReceiverNotImplemented();
    }

    function _safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        _safeTransferFrom(from, to, tokenId, '');
    }

    function _safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal virtual {
        _handleTransferMessageValue(from, to, tokenId, msg.value);
        if (!_isApprovedOrOwner(_msgSender(), tokenId))
            revert NonFungibleToken__NotOwnerOrApproved();
        _safeTransfer(from, to, tokenId, data);
    }

    function _approve(address operator, uint256 tokenId) internal virtual {
        _handleApproveMessageValue(operator, tokenId, msg.value);

        address owner = _ownerOf(tokenId);

        if (operator == owner) revert NonFungibleToken__SelfApproval();
        if (_msgSender() != owner && !_isApprovedForAll(owner, _msgSender()))
            revert NonFungibleToken__NotOwnerOrApproved();

        ERC721Storage.layout(ERC721Storage.DEFAULT_STORAGE_SLOT).tokenApprovals[
            tokenId
        ] = operator;
        emit Approval(owner, operator, tokenId);
    }

    function _setApprovalForAll(
        address operator,
        bool status
    ) internal virtual {
        if (operator == _msgSender()) revert NonFungibleToken__SelfApproval();
        ERC721Storage
            .layout(ERC721Storage.DEFAULT_STORAGE_SLOT)
            .operatorApprovals[_msgSender()][operator] = status;
        emit ApprovalForAll(_msgSender(), operator, status);
    }

    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal virtual returns (bool) {
        if (!to.isContract()) {
            return true;
        }

        bytes memory returnData = to.functionCall(
            abi.encodeWithSelector(
                IERC721Receiver(to).onERC721Received.selector,
                _msgSender(),
                from,
                tokenId,
                data
            ),
            'NonFungibleToken: transfer to non ERC721Receiver implementer'
        );

        bytes4 returnValue = abi.decode(returnData, (bytes4));
        return returnValue == type(IERC721Receiver).interfaceId;
    }

    /**
     * @notice ERC721 hook, called before externally called approvals for processing of included message value
     * @param operator beneficiary of approval
     * @param tokenId id of transferred token
     * @param value message value
     */
    function _handleApproveMessageValue(
        address operator,
        uint256 tokenId,
        uint256 value
    ) internal virtual {}

    /**
     * @notice ERC721 hook, called before externally called transfers for processing of included message value
     * @param from sender of token
     * @param to receiver of token
     * @param tokenId id of transferred token
     * @param value message value
     */
    function _handleTransferMessageValue(
        address from,
        address to,
        uint256 tokenId,
        uint256 value
    ) internal virtual {}

    /**
     * @notice ERC721 hook, called before all transfers including mint and burn
     * @dev function should be overridden and new implementation must call super
     * @param from sender of token
     * @param to receiver of token
     * @param tokenId id of transferred token
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}
}
