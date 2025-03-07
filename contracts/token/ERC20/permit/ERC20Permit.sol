// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2612 } from '../../../interfaces/IERC2612.sol';
import { _ERC20Permit } from './_ERC20Permit.sol';
import { ERC20PermitStorage } from './ERC20PermitStorage.sol';
import { IERC20Permit } from './IERC20Permit.sol';

/**
 * @title ERC20 extension with support for ERC2612 permits
 * @dev derived from https://github.com/soliditylabs/ERC20-Permit (MIT license)
 */
abstract contract ERC20Permit is IERC20Permit, _ERC20Permit {
    /**
     * @inheritdoc IERC2612
     */
    function DOMAIN_SEPARATOR()
        external
        view
        returns (bytes32 domainSeparator)
    {
        return _DOMAIN_SEPARATOR();
    }

    /**
     * @inheritdoc IERC2612
     */
    function nonces(address owner) external view returns (uint256) {
        return _nonces(owner);
    }

    /**
     * @inheritdoc IERC2612
     */
    function permit(
        address owner,
        address spender,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        _permit(owner, spender, amount, deadline, v, r, s);
    }
}
