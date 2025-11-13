// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ECDSA } from '../../../cryptography/ECDSA.sol';
import { EIP712 } from '../../../cryptography/EIP712.sol';
import { ERC20Storage } from '../../../storage/ERC20Storage.sol';
import { _FungibleTokenMetadata } from '../metadata/_FungibleTokenMetadata.sol';
import { _FungibleToken } from '../_FungibleToken.sol';
import { _IFungibleTokenPermit } from './_IFungibleTokenPermit.sol';

/**
 * @title ERC20 extension with support for ERC2612 permits
 * @dev derived from https://github.com/soliditylabs/ERC20-Permit (MIT license)
 */
abstract contract _FungibleTokenPermit is
    _IFungibleTokenPermit,
    _FungibleToken,
    _FungibleTokenMetadata
{
    using ECDSA for bytes32;

    bytes32 internal constant EIP712_TYPE_HASH =
        keccak256(
            'Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)'
        );

    /**
     * @notice return the EIP-712 domain separator unique to contract and chain
     * @return domainSeparator domain separator
     */
    function _DOMAIN_SEPARATOR()
        internal
        view
        virtual
        returns (bytes32 domainSeparator)
    {
        domainSeparator = EIP712.calculateDomainSeparator_01111(
            keccak256(bytes(_name())),
            keccak256(bytes(_version()))
        );
    }

    /**
     * @notice get the current ERC2612 nonce for the given address
     * @return current nonce
     */
    function _nonces(address owner) internal view virtual returns (uint256) {
        return
            ERC20Storage
                .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
                .erc2612Nonces[owner];
    }

    /**
     * @notice query signing domain version
     * @return version signing domain version
     */
    function _version() internal view virtual returns (string memory version) {
        version = '1';
    }

    /**
     * @notice TODO
     * @return fields
     * @return name
     * @return version
     * @return chainId
     * @return verifyingContract
     * @return salt
     * @return extensions
     */
    function _eip712Domain()
        internal
        view
        virtual
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
        return (
            EIP712.ERC5267_FIELDS_01111,
            _name(),
            _version(),
            block.chainid,
            address(this),
            bytes32(0),
            new uint256[](0)
        );
    }

    /**
     * @notice approve spender to transfer tokens held by owner via signature
     * @dev this function may be vulnerable to approval replay attacks
     * @param owner holder of tokens and signer of permit
     * @param spender beneficiary of approval
     * @param amount quantity of tokens to approve
     * @param v secp256k1 'v' value
     * @param r secp256k1 'r' value
     * @param s secp256k1 's' value
     */
    function _permit(
        address owner,
        address spender,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal virtual {
        if (deadline < block.timestamp)
            revert FungibleTokenPermit__ExpiredDeadline();

        uint256 nonce = ERC20Storage
            .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
            .erc2612Nonces[owner]++;

        // execute EIP-712 hashStruct procedure

        bytes32 structHash;

        assembly {
            // assembly block equavalent to:
            //
            // structHash = keccak256(
            //   abi.encode(
            //     EIP712_TYPE_HASH,
            //     owner,
            //     spender,
            //     amount,
            //     nonce,
            //     deadline
            //   )
            // );

            // load free memory pointer
            let pointer := mload(64)

            mstore(
                pointer,
                0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9
            )
            mstore(add(pointer, 32), owner)
            mstore(add(pointer, 64), spender)
            mstore(add(pointer, 96), amount)
            mstore(add(pointer, 128), nonce)
            mstore(add(pointer, 160), deadline)

            structHash := keccak256(pointer, 192)
        }

        // recreate final data payload hash which was signed by token owner

        bytes32 recoverableHash = ECDSA.toEIP712RecoverableHash(
            _DOMAIN_SEPARATOR(),
            structHash
        );

        // validate signature

        if (recoverableHash.recover(v, r, s) != owner)
            revert FungibleTokenPermit__InvalidSignature();

        _approve(owner, spender, amount);
    }
}
