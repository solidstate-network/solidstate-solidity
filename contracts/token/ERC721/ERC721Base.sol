// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// TODO: remove ERC165

import '../../introspection/ERC165.sol';
import '../../utils/AddressUtils.sol';
import '../../utils/EnumerableMap.sol';
import '../../utils/EnumerableSet.sol';
import './IERC721.sol';
import './IERC721Receiver.sol';
import './ERC721BaseStorage.sol';

abstract contract ERC721Base is IERC721, ERC165 {
  using AddressUtils for address;
  using EnumerableMap for EnumerableMap.UintToAddressMap;
  using EnumerableSet for EnumerableSet.UintSet;

  bytes4 private constant ERC721_RECEIVED = 0x150b7a02;

  function balanceOf (address owner) override public view returns (uint) {
    require(owner != address(0), 'ERC721: balance query for the zero address');
    return ERC721BaseStorage.layout().holderTokens[owner].length();
  }

  function ownerOf (uint tokenId) override public view returns (address) {
    address owner = ERC721BaseStorage.layout().tokenOwners.get(tokenId);
    require(owner != address(0), 'ERC721: invalid owner');
    return owner;
  }

  function getApproved (uint tokenId) override public view returns (address) {
    require(ERC721BaseStorage.exists(tokenId), 'ERC721: approved query for nonexistent token');
    return ERC721BaseStorage.layout().tokenApprovals[tokenId];
  }

  function isApprovedForAll (address owner, address operator) override public view returns (bool) {
    return ERC721BaseStorage.layout().operatorApprovals[owner][operator];
  }

  function transferFrom (address from, address to, uint tokenId) override public payable {
    // TODO: handle payment
    require(_isApprovedOrOwner(msg.sender, tokenId), 'ERC721: transfer caller is not owner or approved');
    _transfer(from, to, tokenId);
  }

  function safeTransferFrom (address from, address to, uint tokenId) override public payable {
    // TODO: handle payment
    safeTransferFrom(from, to, tokenId, '');
  }

  function safeTransferFrom (address from, address to, uint tokenId, bytes memory data) override public payable {
    // TODO: handle payment
    require(_isApprovedOrOwner(msg.sender, tokenId), 'ERC721: transfer caller is not owner or approved');
    _safeTransfer(from, to, tokenId, data);
  }

  function approve (address to, uint tokenId) override public payable {
    // TODO: handle payment
    address owner = ownerOf(tokenId);
    require(to != owner, 'ERC721: approval to current owner');
    require(msg.sender == owner || isApprovedForAll(owner, msg.sender), 'ERC721: approve caller is not owner nor approved for all');
    _approve(to, tokenId);
  }

  function setApprovalForAll (address operator, bool status) override public {
    require(operator != msg.sender, 'ERC721: approve to caller');
    ERC721BaseStorage.layout().operatorApprovals[msg.sender][operator] = status;
    emit ApprovalForAll(msg.sender, operator, status);
  }

  function _isApprovedOrOwner (address spender, uint tokenId) internal view returns (bool) {
    require(ERC721BaseStorage.exists(tokenId), 'ERC721: query for nonexistent token');
    address owner = ownerOf(tokenId);
    return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
  }

  function _mint (address to, uint tokenId) internal {
    require(to != address(0), 'ERC721: mint to the zero address');
    require(!ERC721BaseStorage.exists(tokenId), 'ERC721: token already minted');

    _beforeTokenTransfer(address(0), to, tokenId);

    ERC721BaseStorage.Layout storage l = ERC721BaseStorage.layout();
    l.holderTokens[to].add(tokenId);
    l.tokenOwners.set(tokenId, to);

    emit Transfer(address(0), to, tokenId);
  }

  function _safeMint (address to, uint tokenId) internal {
    _safeMint(to, tokenId, '');
  }

  function _safeMint (address to, uint tokenId, bytes memory data) internal {
    _mint(to, tokenId);
    require(_checkOnERC721Received(address(0), to, tokenId, data), 'ERC721: transfer to non ERC721Receiver implementer');
  }

  function _burn (uint tokenId) internal {
    address owner = ownerOf(tokenId);

    _beforeTokenTransfer(owner, address(0), tokenId);

    _approve(address(0), tokenId);

    ERC721BaseStorage.Layout storage l = ERC721BaseStorage.layout();
    l.holderTokens[owner].remove(tokenId);
    l.tokenOwners.remove(tokenId);

    emit Transfer(owner, address(0), tokenId);
  }

  function _transfer (address from, address to, uint tokenId) internal {
    require(ownerOf(tokenId) == from, 'ERC721: transfer of token that is not own');
    require(to != address(0), 'ERC721: transfer to the zero address');

    _beforeTokenTransfer(from, to, tokenId);

    _approve(address(0), tokenId);

    ERC721BaseStorage.Layout storage l = ERC721BaseStorage.layout();
    l.holderTokens[from].remove(tokenId);
    l.holderTokens[to].add(tokenId);
    l.tokenOwners.set(tokenId, to);

    emit Transfer(from, to, tokenId);
  }

  function _safeTransfer (address from, address to, uint tokenId, bytes memory data) internal {
    _transfer(from, to, tokenId);
    require(_checkOnERC721Received(from, to, tokenId, data), 'ERC721: transfer to non ERC721Receiver implementer');
  }

  function _approve (address to, uint tokenId) internal {
    ERC721BaseStorage.layout().tokenApprovals[tokenId] = to;
    emit Approval(ownerOf(tokenId), to, tokenId);
  }

  function _checkOnERC721Received (address from, address to, uint tokenId, bytes memory data) private returns (bool) {
    if (!to.isContract()) {
      return true;
    }

    bytes memory returnData = to.functionCall(abi.encodeWithSelector(
      IERC721Receiver(to).onERC721Received.selector,
      msg.sender,
      from,
      tokenId,
      data
    ), 'ERC721: transfer to non ERC721Receiver implementer');

    bytes4 returnValue = abi.decode(returnData, (bytes4));
    return returnValue == ERC721_RECEIVED;
  }

  function _beforeTokenTransfer (address from, address to, uint tokenId) virtual internal {}
}
