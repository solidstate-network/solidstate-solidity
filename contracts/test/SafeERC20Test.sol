// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { IERC20 } from '../interfaces/IERC20.sol';
import { IERC2612 } from '../interfaces/IERC2612.sol';
import { SafeERC20 } from '../utils/SafeERC20.sol';

contract SafeERC20Test {
    using SafeERC20 for IERC20;
    using SafeERC20 for IERC2612;

    function safeTransfer(
        IERC20 token,
        address to,
        uint256 value
    ) external {
        token.safeTransfer(to, value);
    }

    function safeTransferFrom(
        IERC20 token,
        address from,
        address to,
        uint256 value
    ) external {
        token.safeTransferFrom(from, to, value);
    }

    function safeApprove(
        IERC20 token,
        address spender,
        uint256 value
    ) external {
        token.safeApprove(spender, value);
    }

    function safeIncreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) external {
        token.safeIncreaseAllowance(spender, value);
    }

    function safeDecreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) external {
        token.safeDecreaseAllowance(spender, value);
    }

    function safePermit(
        IERC2612 token,
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        token.safePermit(
            owner,
            spender,
            value,
            deadline,
            v,
            r,
            s
        );
    }
}
