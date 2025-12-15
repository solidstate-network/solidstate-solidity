// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC721Receiver } from './_IERC721Receiver.sol';

interface IERC721Receiver is _IERC721Receiver {
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}
