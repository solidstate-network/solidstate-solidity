// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC1155 } from '../../../interfaces/IERC1155.sol';

/**
 * @title ERC1155 base interface
 */
interface IERC1155Base is IERC1155 {
    error ERC1155__ArrayLengthMismatch();
    error ERC1155__BalanceQueryZeroAddress();
    error ERC1155__NotOwnerOrApproved();
    error ERC1155__SelfApproval();
}
