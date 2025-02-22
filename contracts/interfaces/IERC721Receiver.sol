// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC721ReceiverInternal } from './IERC721ReceiverInternal.sol';

interface IERC721Receiver is IERC721ReceiverInternal {
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}
