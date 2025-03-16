// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2612 } from '../../../interfaces/IERC2612.sol';
import { IERC5267 } from '../../../interfaces/IERC5267.sol';
import { _FungibleTokenPermit } from './_FungibleTokenPermit.sol';
import { ERC20Storage } from '../../../storage/ERC20Storage.sol';
import { IFungibleTokenPermit } from './IFungibleTokenPermit.sol';

/**
 * @title ERC20 extension with support for ERC2612 permits
 * @dev derived from https://github.com/soliditylabs/ERC20-Permit (MIT license)
 */
abstract contract FungibleTokenPermit is
    IFungibleTokenPermit,
    _FungibleTokenPermit
{
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

    /**
     * @inheritdoc IERC5267
     */
    function eip712Domain()
        external
        view
        returns (
            bytes1 fields,
            string memory name,
            string memory version,
            uint256 chainId,
            address verifyingContract,
            bytes32 salt,
            uint256[] memory extensions
        )
    {
        return _eip712Domain();
    }
}
