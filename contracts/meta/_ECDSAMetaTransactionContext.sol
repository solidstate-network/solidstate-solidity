// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ECDSA } from '../cryptography/ECDSA.sol';
import { EIP712 } from '../cryptography/EIP712.sol';
import { Slot } from '../data/Slot.sol';
import { _TransientReentrancyGuard } from '../access/reentrancy_guard/_TransientReentrancyGuard.sol';
import { Bytes32 } from '../utils/Bytes32.sol';
import { Bytes32Builder } from '../data/Bytes32Builder.sol';
import { _Context } from './_Context.sol';
import { _IECDSAMetaTransactionContext } from './_IECDSAMetaTransactionContext.sol';

abstract contract _ECDSAMetaTransactionContext is
    _IECDSAMetaTransactionContext,
    _Context,
    _TransientReentrancyGuard
{
    using Bytes32 for bytes32;
    using Bytes32Builder for Bytes32.Builder;
    using ECDSA for bytes32;
    using Slot for Slot.TransientSlot;

    bytes32 internal constant EIP_712_TYPE_HASH =
        keccak256(
            'ECDSAMetaTransaction(bytes msgData,uint256 msgValue,uint256 nonce)'
        );

    Slot.TransientSlot private constant TRANSIENT_SLOT =
        Slot.TransientSlot.wrap(
            keccak256(abi.encode(uint256(EIP_712_TYPE_HASH) - 1)) &
                ~bytes32(uint256(0xff))
        );

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

        // context is cached in transient storage, which is not cleared until the end of the transaction
        // this enables the possibility of replay attacks within a single transaction which calls this contract multiple times
        // therefore, all functions which use context must be nonReentrant, and the lock must be set before context is accessed

        if (dataLength >= suffixLength && _isReentrancyGuardLocked()) {
            // calldata is long enough that it might have a suffix
            // check transient storage to see if sender has been derived already

            // toAddress function strips the packed msgDataIndex data and returns a clean address
            msgSender = TRANSIENT_SLOT.read().toBuilder().parseAddress(0);

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

        // context is cached in transient storage, which is not cleared until the end of the transaction
        // this enables the possibility of replay attacks within a single transaction which calls this contract multiple times
        // therefore, all functions which use context must be nonReentrant, and the lock must be set before context is accessed

        if (dataLength >= suffixLength && _isReentrancyGuardLocked()) {
            // calldata is long enough that it might have a suffix
            // check transient storage to see if msgData split index has been derived already

            // unpack the msgDataIndex which is stored alongside msgSender
            uint256 split = TRANSIENT_SLOT.read().toBuilder().parseUint96(160);

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
     * @dev this Context extension defines a suffix with a length of 85
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

        // it is necessary to store metadata in transient storage because
        // subsequent derivation will fail due to nonce invalidation

        Bytes32.Builder memory builder;

        builder.pushAddress(msgSender);
        builder.pushUint96(uint96(msgDataIndex));

        TRANSIENT_SLOT.write(builder._data);
    }

    /**
     * @inheritdoc _TransientReentrancyGuard
     * @dev clear the cached context to prevent replay attacks
     */
    function _lockReentrancyGuard() internal virtual override {
        TRANSIENT_SLOT.clear();
        super._lockReentrancyGuard();
    }
}
