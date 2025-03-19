// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ECDSA } from '../../../cryptography/ECDSA.sol';
import { EIP712 } from '../../../cryptography/EIP712.sol';
import { _FungibleToken } from '../_FungibleToken.sol';
import { _FungibleTokenMetadata } from '../metadata/_FungibleTokenMetadata.sol';
import { ERC20Storage } from '../../../storage/ERC20Storage.sol';
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
        domainSeparator = EIP712.calculateDomainSeparator(
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
            hex'0f', // 01111
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

        // execute EIP-712 hashStruct procedure

        bytes32 typeHash = EIP712_TYPE_HASH;

        uint256 nonce = ERC20Storage
            .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
            .erc2612Nonces[owner]++;

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

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), owner)
            mstore(add(pointer, 64), spender)
            mstore(add(pointer, 96), amount)
            mstore(add(pointer, 128), nonce)
            mstore(add(pointer, 160), deadline)

            structHash := keccak256(pointer, 192)
        }

        // recreate and hash data payload

        bytes32 domainSeparator = _DOMAIN_SEPARATOR();

        bytes32 signedHash;

        assembly {
            // assembly block equivalent to:
            //
            // signedHash = keccak256(
            //   abi.encodePacked(
            //     uint16(0x1901),
            //     domainSeparator,
            //     structHash
            //   )
            // );

            // load free memory pointer
            let pointer := mload(64)

            // this magic value is the EIP-191 signed data header, consisting of
            // the hardcoded 0x19 and the one-byte version 0x01
            mstore(
                pointer,
                0x1901000000000000000000000000000000000000000000000000000000000000
            )
            mstore(add(pointer, 2), domainSeparator)
            mstore(add(pointer, 34), structHash)

            signedHash := keccak256(pointer, 66)
        }

        // validate signature

        if (signedHash.recover(v, r, s) != owner)
            revert FungibleTokenPermit__InvalidSignature();

        _approve(owner, spender, amount);
    }
}
