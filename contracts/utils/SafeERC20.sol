// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { IERC20 } from '../interfaces/IERC20.sol';
import { IERC2612 } from '../interfaces/IERC2612.sol';
import { Address } from './Address.sol';

/**
 * @title Safe ERC20 interaction library
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts/ (MIT license)
 */
library SafeERC20 {
    using Address for address;

    error SafeERC20__ApproveFromNonZeroToNonZero();
    error SafeERC20__DecreaseAllowanceBelowZero();
    error SafeERC20__OperationFailed();
    error SafeERC20__PermitFailed();

    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(token.transfer.selector, to, value)
        );
    }

    function safeTransferFrom(
        IERC20 token,
        address from,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(token.transferFrom.selector, from, to, value)
        );
    }

    function safeApprove(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(token.approve.selector, spender, value)
        );
    }

    function safeIncreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        uint256 newAllowance = token.allowance(address(this), spender) + value;
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(
                token.approve.selector,
                spender,
                newAllowance
            )
        );
    }

    function safeDecreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        unchecked {
            uint256 oldAllowance = token.allowance(address(this), spender);
            if (oldAllowance < value)
                revert SafeERC20__DecreaseAllowanceBelowZero();
            uint256 newAllowance = oldAllowance - value;
            _callOptionalReturn(
                token,
                abi.encodeWithSelector(
                    token.approve.selector,
                    spender,
                    newAllowance
                )
            );
        }
    }

    /**
     * @notice approve spender to transfer tokens held by owner via ERC-2612 permit signature
     * @dev tolerates reverts so that a front-run or already-executed permit does not block
     * the caller. If the permit call reverts, the existing allowance is checked; execution
     * continues only if the spender already has sufficient allowance.
     * @param token ERC-2612 permit token interface
     * @param owner holder of tokens and signer of permit
     * @param spender beneficiary of approval
     * @param value quantity of tokens to approve
     * @param deadline timestamp after which permit is invalid
     * @param v secp256k1 'v' value
     * @param r secp256k1 'r' value
     * @param s secp256k1 's' value
     */
    function safePermit(
        IERC2612 token,
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal {
        (bool success, ) = address(token).call(
            abi.encodeWithSelector(
                token.permit.selector,
                owner,
                spender,
                value,
                deadline,
                v,
                r,
                s
            )
        );

        // permit authorizes an exact amount; if the call reverted, the existing
        // allowance must equal the signed value for the permit to be considered
        // already executed (e.g., via front-running)
        if (!success && token.allowance(owner, spender) != value)
            revert SafeERC20__PermitFailed();
    }

    /**
     * @notice send transaction data and check validity of return value, if present
     * @param token ERC20 token interface
     * @param data transaction data
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        bytes memory returndata = address(token).functionCall(
            data,
            SafeERC20__OperationFailed.selector
        );

        if (returndata.length > 0) {
            if (!abi.decode(returndata, (bool)))
                revert SafeERC20__OperationFailed();
        }
    }
}
