// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {AddressUtils} from '../../../utils/AddressUtils.sol';
import {EnumerableMap} from '../../../utils/EnumerableMap.sol';
import {EnumerableSet} from '../../../utils/EnumerableSet.sol';
import {IERC721} from '../IERC721.sol';
import {IERC721Receiver} from '../IERC721Receiver.sol';
import {ERC721BaseStorage} from './ERC721BaseStorage.sol';
import {ERC721BaseInternal} from './ERC721BaseInternal.sol';

/**
 * @notice Base ERC721 implementation, excluding optional extensions
 */
abstract contract ERC721Base is IERC721, ERC721BaseInternal {
  using AddressUtils for address;
  using EnumerableMap for EnumerableMap.UintToAddressMap;
  using EnumerableSet for EnumerableSet.UintSet;

  /**
   * @inheritdoc IERC721
   */
  function balanceOf (address account) override public view returns (uint) {
    require(account != address(0), 'ERC721: balance query for the zero address');
    return ERC721BaseStorage.layout().holderTokens[account].length();
  }

  /**
   * @inheritdoc IERC721
   */
  function ownerOf (uint tokenId) override public view returns (address) {
    return _ownerOf(tokenId);
  }

  /**
   * @inheritdoc IERC721
   */
  function getApproved (uint tokenId) override public view returns (address) {
    return _getApproved(tokenId);
  }

  /**
   * @inheritdoc IERC721
   */
  function isApprovedForAll (address account, address operator) override public view returns (bool) {
    return _isApprovedForAll(account, operator);
  }

  /**
   * @inheritdoc IERC721
   */
  function transferFrom (address from, address to, uint tokenId) override public payable {
    _handleTransferMessageValue(from, to, tokenId, msg.value);
    require(_isApprovedOrOwner(msg.sender, tokenId), 'ERC721: transfer caller is not owner or approved');
    _transfer(from, to, tokenId);
  }

  /**
   * @inheritdoc IERC721
   */
  function safeTransferFrom (address from, address to, uint tokenId) override public payable {
    safeTransferFrom(from, to, tokenId, '');
  }

  /**
   * @inheritdoc IERC721
   */
  function safeTransferFrom (address from, address to, uint tokenId, bytes memory data) override public payable {
    _handleTransferMessageValue(from, to, tokenId, msg.value);
    require(_isApprovedOrOwner(msg.sender, tokenId), 'ERC721: transfer caller is not owner or approved');
    _safeTransfer(from, to, tokenId, data);
  }

  /**
   * @inheritdoc IERC721
   */
  function approve (address operator, uint tokenId) override public payable {
    _handleApproveMessageValue(operator, tokenId, msg.value);
    address owner = ownerOf(tokenId);
    require(operator != owner, 'ERC721: approval to current owner');
    require(msg.sender == owner || isApprovedForAll(owner, msg.sender), 'ERC721: approve caller is not owner nor approved for all');
    _approve(operator, tokenId);
  }

  /**
   * @inheritdoc IERC721
   */
  function setApprovalForAll (address operator, bool status) override public {
    require(operator != msg.sender, 'ERC721: approve to caller');
    ERC721BaseStorage.layout().operatorApprovals[msg.sender][operator] = status;
    emit ApprovalForAll(msg.sender, operator, status);
  }
}
