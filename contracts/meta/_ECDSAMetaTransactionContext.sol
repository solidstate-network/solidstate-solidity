// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ECDSA } from '../cryptography/ECDSA.sol';
import { EIP712 } from '../cryptography/EIP712.sol';
import { _Context } from './_Context.sol';
import { _IECDSAMetaTransactionContext } from './_IECDSAMetaTransactionContext.sol';

abstract contract _ECDSAMetaTransactionContext is
    _IECDSAMetaTransactionContext,
    _Context
{
    using ECDSA for bytes32;

    bytes32 internal constant EIP_712_TYPE_HASH =
        keccak256('ECDSAMetaTransaction(bytes msgData,uint256 nonce)');

    bytes32
        internal constant ECDSA_META_TRANSACTION_CONTEXT_TRANSIENT_STORAGE_SLOT =
        keccak256(abi.encode(uint256(EIP_712_TYPE_HASH) - 1)) &
            ~bytes32(uint256(0xff));

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
            EIP712.ERC5267_FIELDS_01100,
            '',
            '',
            block.chainid,
            address(this),
            bytes32(0),
            new uint256[](0)
        );
    }

    /**
     * @inheritdoc _Context
     * @dev sender is read from the calldata context suffix
     */
    function _msgSender()
        internal
        virtual
        override
        returns (address msgSender)
    {
        uint256 dataLength = msg.data.length;
        uint256 suffixLength = _calldataSuffixLength();

        if (dataLength >= suffixLength) {
            // calldata is long enough that it might have a suffix
            // check transient storage to see if sender has been derived already

            bytes32 slot = ECDSA_META_TRANSACTION_CONTEXT_TRANSIENT_STORAGE_SLOT;

            assembly {
                msgSender := tload(slot)
            }

            if (msgSender == address(0)) {
                // no sender found in transient storage, so attempt to derive it from signature

                unchecked {
                    (msgSender, ) = _processCalldata(dataLength - suffixLength);
                }
            }
        } else {
            msgSender = super._msgSender();
        }
    }

    /**
     * @inheritdoc _Context
     */
    function _msgData()
        internal
        virtual
        override
        returns (bytes calldata msgData)
    {
        uint256 dataLength = msg.data.length;
        uint256 suffixLength = _calldataSuffixLength();

        if (dataLength >= suffixLength) {
            // calldata is long enough that it might have a suffix
            // check transient storage to see if msgData split index has been derived already

            uint256 split;

            bytes32 slot = ECDSA_META_TRANSACTION_CONTEXT_TRANSIENT_STORAGE_SLOT;

            assembly {
                split := tload(add(slot, 1))
            }

            if (split == 0) {
                // no msgData split index found in transient storage, so attempt to derive it from signature

                unchecked {
                    (, split) = _processCalldata(dataLength - suffixLength);
                }
            }

            msgData = msg.data[:split];
        } else {
            msgData = super._msgData();
        }
    }

    /**
     * @inheritdoc _Context
     * @dev this Context extension defines an address suffix with a length of 20
     */
    function _calldataSuffixLength()
        internal
        view
        virtual
        override
        returns (uint256 length)
    {
        length = 97;
    }

    function _processCalldata(
        uint256 split
    ) private returns (address msgSender, uint256 msgDataIndex) {
        unchecked {
            bytes calldata msgData = msg.data[:split];
            uint256 nonce = uint256(bytes32(msg.data[split:split + 32]));

            // TODO: include msg.sender in hash to restrict forwarder
            // TODO: include msg.value
            bytes32 structHash = keccak256(
                abi.encode(EIP_712_TYPE_HASH, keccak256(msgData), nonce)
            );

            bytes32 domainSeparator = EIP712.calculateDomainSeparator_01100();

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

            bytes calldata signature = msg.data[split + 32:];

            // TODO: see what happens if split calldata v r s
            address signer = signedHash.tryRecover(signature);

            // TODO: invalidate nonce

            if (signer == address(0)) {
                msgSender = super._msgSender();
                msgDataIndex = super._msgData().length;
            } else {
                msgSender = signer;
                msgDataIndex = split;
            }
        }

        bytes32 slot = ECDSA_META_TRANSACTION_CONTEXT_TRANSIENT_STORAGE_SLOT;

        assembly {
            // TODO: suppress warning
            // TODO: pack (msgDataIndex as bytes12)
            tstore(slot, msgSender)
            tstore(add(slot, 1), msgDataIndex)
        }
    }
}
