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
        keccak256(
            'ECDSAMetaTransaction(bytes msgData,uint256 msgValue,uint256 nonce)'
        );

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
            // calldata is too short for this to be a valid meta transaction
            // return message sender as-is
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
            // calldata is too short for this to be a valid meta transaction
            // return message data as-is
            msgData = super._msgData();
        }
    }

    /**
     * @inheritdoc _Context
     * @dev this Context extension defines an address suffix with a length of 85
     */
    function _calldataSuffixLength()
        internal
        view
        virtual
        override
        returns (uint256 length)
    {
        length = 85;
    }

    function _processCalldata(
        uint256 split
    ) private returns (address msgSender, uint256 msgDataIndex) {
        unchecked {
            bytes calldata msgData = msg.data[:split];
            msgSender = address(bytes20(msg.data[split:split + 20]));
            bytes calldata signature = msg.data[split + 20:];

            // TODO: lookup and invalidate nonce
            uint256 nonce = 1;

            // TODO: include msg.sender in hash to restrict forwarder?
            bytes32 structHash = keccak256(
                abi.encode(
                    EIP_712_TYPE_HASH,
                    keccak256(msgData),
                    msg.value,
                    nonce
                )
            );

            bytes32 recoverableHash = ECDSA.toEIP712RecoverableHash(
                EIP712.calculateDomainSeparator_01100(),
                structHash
            );

            // TODO: see what happens if split calldata v r s
            address signer = recoverableHash.tryRecover(signature);

            if (signer == msgSender) {
                msgDataIndex = split;
            } else {
                msgSender = super._msgSender();
                msgDataIndex = super._msgData().length;
            }
        }

        bytes32 slot = ECDSA_META_TRANSACTION_CONTEXT_TRANSIENT_STORAGE_SLOT;

        assembly {
            // it is necessary to store metadata in transient storage because
            // subsequent derivation will fail due to nonce invalidation
            // TODO: pack (msgDataIndex as bytes12)
            tstore(slot, msgSender)
            tstore(add(slot, 1), msgDataIndex)
        }
    }
}
