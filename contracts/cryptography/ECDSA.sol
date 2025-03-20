// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Elliptic Curve Digital Signature Algorithm (ECDSA) operations
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
library ECDSA {
    error ECDSA__InvalidS();
    error ECDSA__InvalidSignature();
    error ECDSA__InvalidSignatureLength();
    error ECDSA__InvalidV();

    /**
     * @notice recover signer of hashed message from signature, reverting on failure
     * @param hash hashed data payload
     * @param signature signed data payload
     * @return signer recovered message signer
     */
    function recover(
        bytes32 hash,
        bytes memory signature
    ) internal pure returns (address signer) {
        function() pure errorFn;

        (signer, errorFn) = _tryRecover(hash, signature);

        if (signer == address(0)) errorFn();
    }

    /**
     * @notice recover signer of hashed message from signature v, r, and s values, reverting on failure
     * @param hash hashed data payload
     * @param v signature "v" value
     * @param r signature "r" value
     * @param s signature "s" value
     * @return signer recovered message signer
     */
    function recover(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal pure returns (address signer) {
        function() pure errorFn;

        (signer, errorFn) = _tryRecover(hash, v, r, s);

        if (signer == address(0)) errorFn();
    }

    /**
     * @notice attempt to recover signer of hashed message from signature
     * @param hash hashed data payload
     * @param signature signed data payload
     * @return signer recovered message signer (zero address on recovery failure)
     */
    function tryRecover(
        bytes32 hash,
        bytes memory signature
    ) internal pure returns (address signer) {
        (signer, ) = _tryRecover(hash, signature);
    }

    /**
     * @notice attempt to recover signer of hashed message from signature v, r, and s values
     * @param hash hashed data payload
     * @param v signature "v" value
     * @param r signature "r" value
     * @param s signature "s" value
     * @return signer recovered message signer (zero address on recovery failure)
     */
    function tryRecover(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal pure returns (address signer) {
        (signer, ) = _tryRecover(hash, v, r, s);
    }

    /**
     * @notice attempt to recover signer of hashed message from signature
     * @param hash hashed data payload
     * @param signature signed data payload
     * @return signer recovered message signer (zero address on recovery failure)
     * @return errorFn wrapper function around custom error revert
     */
    function _tryRecover(
        bytes32 hash,
        bytes memory signature
    ) private pure returns (address signer, function() pure errorFn) {
        if (signature.length != 65) {
            return (address(0), _revert_ECDSA__InvalidSignatureLength);
        }

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly ('memory-safe') {
            r := mload(add(signature, 0x20))
            s := mload(add(signature, 0x40))
            v := byte(0, mload(add(signature, 0x60)))
        }

        (signer, errorFn) = _tryRecover(hash, v, r, s);
    }

    /**
     * @notice attempt to recover signer of hashed message from signature v, r, and s values
     * @param hash hashed data payload
     * @param v signature "v" value
     * @param r signature "r" value
     * @param s signature "s" value
     * @return signer recovered message signer (zero address on recovery failure)
     * @return errorFn wrapper function around custom error revert
     */
    function _tryRecover(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) private pure returns (address signer, function() pure errorFn) {
        // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature
        // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines
        // the valid range for s in (281): 0 < s < secp256k1n ÷ 2 + 1, and for v in (282): v ∈ {27, 28}. Most
        // signatures from current libraries generate a unique signature with an s-value in the lower half order.
        //
        // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value
        // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or
        // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept
        // these malleable signatures as well.
        if (
            uint256(s) >
            0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0
        ) return (address(0), _revert_ECDSA__InvalidS);

        if (v != 27 && v != 28) return (address(0), _revert_ECDSA__InvalidV);

        // If the signature is valid (and not malleable), return the signer address
        signer = ecrecover(hash, v, r, s);

        if (signer == address(0))
            return (address(0), _revert_ECDSA__InvalidSignature);
    }

    /**
     * @notice generate an "Ethereum Signed Message" in the format returned by the eth_sign JSON-RPC method
     * @param hash hashed data payload
     * @return signedMessage signed message hash
     */
    function toEthSignedMessageHash(
        bytes32 hash
    ) internal pure returns (bytes32 signedMessage) {
        signedMessage = keccak256(
            abi.encodePacked('\x19Ethereum Signed Message:\n32', hash)
        );
    }

    /**
     * @notice generate an EIP712 signable hash of typed structured data
     * @param domainSeparator EIP712 domain separator
     * @param structHash hash of underlying signed data generated through the EIP712 "hashStruct" process
     * @return recoverableHash hash to validate against signature via ECDSA function
     */
    function toEIP712RecoverableHash(
        bytes32 domainSeparator,
        bytes32 structHash
    ) internal pure returns (bytes32 recoverableHash) {
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

            recoverableHash := keccak256(pointer, 66)
        }
    }

    /**
     * @notice wrapper function for passing custom errors internally
     */
    function _revert_ECDSA__InvalidS() private pure {
        revert ECDSA__InvalidS();
    }

    /**
     * @notice wrapper function for passing custom errors internally
     */
    function _revert_ECDSA__InvalidSignature() private pure {
        revert ECDSA__InvalidSignature();
    }

    /**
     * @notice wrapper function for passing custom errors internally
     */
    function _revert_ECDSA__InvalidSignatureLength() private pure {
        revert ECDSA__InvalidSignatureLength();
    }

    /**
     * @notice wrapper function for passing custom errors internally
     */
    function _revert_ECDSA__InvalidV() private pure {
        revert ECDSA__InvalidV();
    }
}
