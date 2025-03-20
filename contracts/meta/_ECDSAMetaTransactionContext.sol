// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ECDSA } from '../cryptography/ECDSA.sol';
import { _Context } from './_Context.sol';
import { _IECDSAMetaTransactionContext } from './_IECDSAMetaTransactionContext.sol';

abstract contract _ECDSAMetaTransactionContext is
    _IECDSAMetaTransactionContext,
    _Context
{
    using ECDSA for bytes32;

    bytes32 internal constant EIP_712_TYPE_HASH =
        keccak256('ECDSAMetaTransaction(bytes msgData,uint256 nonce)');

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
            hex'0f', // 01100
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

            assembly {
                msgSender := tload(9000)
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

            assembly {
                split := tload(9001)
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
            bytes32 hash = keccak256(
                abi.encode(EIP_712_TYPE_HASH, keccak256(msgData), nonce)
            );

            bytes calldata signature = msg.data[split + 32:];

            // TODO: see what happens if split calldata v r s
            address signer = hash.recover(signature);

            // TODO: invalidate nonce

            if (signer == address(0)) {
                msgSender = super._msgSender();
                msgDataIndex = super._msgData().length;
            } else {
                msgSender = signer;
                msgDataIndex = split;
            }
        }

        assembly {
            // TODO: suppress warning
            // TODO: standardize location
            // TODO: pack (msgDataIndex as bytes12)
            tstore(9000, msgSender)
            tstore(9001, msgDataIndex)
        }
    }
}
