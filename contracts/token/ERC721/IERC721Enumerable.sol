// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC721Enumerable {
  function totalSupply () external view returns (uint256);

  function tokenOfOwnerByIndex (
    address owner,
    uint256 index
  ) external view returns (uint256 tokenId);

  function tokenByIndex (
    uint256 index
  ) external view returns (uint256);
}
