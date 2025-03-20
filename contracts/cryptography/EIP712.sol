// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Procedurally generated EIP-712 typed structured data hashing and signing library
 * @dev see https://eips.ethereum.org/EIPS/eip-712
 **/
library EIP712 {
    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 00000 ()
     * @dev evaluates to 0x20bcc3f8105eea47d067386e42e60246e89393cd61c512edd1e87688890fb914
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_00000 =
        keccak256('EIP712Domain()');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 00001 (name)
     * @dev evaluates to 0xb2178a58fb1eefb359ecfdd57bb19c0bdd0f4e6eed8547f46600e500ed111af3
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_00001 =
        keccak256('EIP712Domain(string name)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 00010 (version)
     * @dev evaluates to 0xbc027d3dfda1ddd4b660dee53f985a2f3b5ea30d0c0708b67f569aa0e361f302
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_00010 =
        keccak256('EIP712Domain(string version)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 00011 (name, version)
     * @dev evaluates to 0xb03948446334eb9b2196d5eb166f69b9d49403eb4a12f36de8d3f9f3cb8e15c3
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_00011 =
        keccak256('EIP712Domain(string name,string version)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 00100 (chainId)
     * @dev evaluates to 0xc49a8e302e3e5d6753b2bb3dbc3c28deba5e16e2572a92aef568063c963e3465
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_00100 =
        keccak256('EIP712Domain(uint256 chainId)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 00101 (name, chainId)
     * @dev evaluates to 0xcc85e4a69ca54da41cc4383bb845cbd1e15ef8a13557a6bed09b8bea2a0d92ff
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_00101 =
        keccak256('EIP712Domain(string name,uint256 chainId)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 00110 (version, chainId)
     * @dev evaluates to 0x95166bc3984a70c39067c848833f87eaf6f7ff10e67fbe819f683dfcefb080e2
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_00110 =
        keccak256('EIP712Domain(string version,uint256 chainId)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 00111 (name, version, chainId)
     * @dev evaluates to 0xc2f8787176b8ac6bf7215b4adcc1e069bf4ab82d9ab1df05a57a91d425935b6e
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_00111 =
        keccak256('EIP712Domain(string name,string version,uint256 chainId)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 01000 (verifyingContract)
     * @dev evaluates to 0x035aff83d86937d35b32e04f0ddc6ff469290eef2f1b692d8a815c89404d4749
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_01000 =
        keccak256('EIP712Domain(address verifyingContract)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 01001 (name, verifyingContract)
     * @dev evaluates to 0xee552a4f357a6d8ecee15fed74927d873616e6da31fd672327acf0916acc174a
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_01001 =
        keccak256('EIP712Domain(string name,address verifyingContract)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 01010 (version, verifyingContract)
     * @dev evaluates to 0xe7cfb1b0c6cc1826928f8134ec4aaff653c53c61279b10ee7b6a1c59f3c76dd2
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_01010 =
        keccak256('EIP712Domain(string version,address verifyingContract)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 01011 (name, version, verifyingContract)
     * @dev evaluates to 0x91ab3d17e3a50a9d89e63fd30b92be7f5336b03b287bb946787a83a9d62a2766
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_01011 =
        keccak256(
            'EIP712Domain(string name,string version,address verifyingContract)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 01100 (chainId, verifyingContract)
     * @dev evaluates to 0x47e79534a245952e8b16893a336b85a3d9ea9fa8c573f3d803afb92a79469218
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_01100 =
        keccak256('EIP712Domain(uint256 chainId,address verifyingContract)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 01101 (name, chainId, verifyingContract)
     * @dev evaluates to 0x8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a866
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_01101 =
        keccak256(
            'EIP712Domain(string name,uint256 chainId,address verifyingContract)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 01110 (version, chainId, verifyingContract)
     * @dev evaluates to 0x2aef22f9d7df5f9d21c56d14029233f3fdaa91917727e1eb68e504d27072d6cd
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_01110 =
        keccak256(
            'EIP712Domain(string version,uint256 chainId,address verifyingContract)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 01111 (name, version, chainId, verifyingContract)
     * @dev evaluates to 0x8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_01111 =
        keccak256(
            'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 10000 (salt)
     * @dev evaluates to 0xed46087c30783a9d27be533e9e6a1f834cec6daf2cfb016c9ab60d791039f983
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_10000 =
        keccak256('EIP712Domain(bytes32 salt)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 10001 (name, salt)
     * @dev evaluates to 0xd1e3f5cf1a3ce7d7b6d652f790cb44165f3cdf0f3002d42f9f1d3e6a808e04b2
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_10001 =
        keccak256('EIP712Domain(string name,bytes32 salt)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 10010 (version, salt)
     * @dev evaluates to 0x9f81c44ff68aaf167190e696336e29da4c6f2ad153d3de14f4f266b70f7cb8d0
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_10010 =
        keccak256('EIP712Domain(string version,bytes32 salt)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 10011 (name, version, salt)
     * @dev evaluates to 0x599a80fcaa47b95e2323ab4d34d34e0cc9feda4b843edafcc30c7bdf60ea15bf
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_10011 =
        keccak256('EIP712Domain(string name,string version,bytes32 salt)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 10100 (chainId, salt)
     * @dev evaluates to 0x564d3aac36678e91beb9d11156d0a35dcedd025eea11212d2b4c45436e4a71ba
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_10100 =
        keccak256('EIP712Domain(uint256 chainId,bytes32 salt)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 10101 (name, chainId, salt)
     * @dev evaluates to 0x362651b35ace4088abd8ab4d0d426e15fe608272f8a9e51785f58e6621412710
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_10101 =
        keccak256('EIP712Domain(string name,uint256 chainId,bytes32 salt)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 10110 (version, chainId, salt)
     * @dev evaluates to 0xc514ad1a6ba6faad885aeab076fe6d1d4f0040791a4e8130fb9c163991fcf25d
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_10110 =
        keccak256('EIP712Domain(string version,uint256 chainId,bytes32 salt)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 10111 (name, version, chainId, salt)
     * @dev evaluates to 0xa604fff5a27d5951f334ccda7abff3286a8af29caeeb196a6f2b40a1dce7612b
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_10111 =
        keccak256(
            'EIP712Domain(string name,string version,uint256 chainId,bytes32 salt)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 11000 (verifyingContract, salt)
     * @dev evaluates to 0x6268546d6d3d3a16ed8cfd22f4fe09a1d17f9af43838183ba533d41e284cf326
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_11000 =
        keccak256('EIP712Domain(address verifyingContract,bytes32 salt)');

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 11001 (name, verifyingContract, salt)
     * @dev evaluates to 0xe00d3e753977caaa77095a287e170b7e5fae131a2e1b3af70a3835665255081f
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_11001 =
        keccak256(
            'EIP712Domain(string name,address verifyingContract,bytes32 salt)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 11010 (version, verifyingContract, salt)
     * @dev evaluates to 0x082f63b4da7f252440ff2be2cdc878665c088a48be3d79095973b727c93fbaec
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_11010 =
        keccak256(
            'EIP712Domain(string version,address verifyingContract,bytes32 salt)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 11011 (name, version, verifyingContract, salt)
     * @dev evaluates to 0x36c25de3e541d5d970f66e4210d728721220fff5c077cc6cd008b3a0c62adab7
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_11011 =
        keccak256(
            'EIP712Domain(string name,string version,address verifyingContract,bytes32 salt)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 11100 (chainId, verifyingContract, salt)
     * @dev evaluates to 0x71062c282d40422f744945d587dbf4ecfd4f9cfad1d35d62c944373009d96162
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_11100 =
        keccak256(
            'EIP712Domain(uint256 chainId,address verifyingContract,bytes32 salt)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 11101 (name, chainId, verifyingContract, salt)
     * @dev evaluates to 0xba3bbab4b37e6e20d315843d8bced25060386a557eeb60eefdbb4096f6ad6923
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_11101 =
        keccak256(
            'EIP712Domain(string name,uint256 chainId,address verifyingContract,bytes32 salt)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 11110 (version, chainId, verifyingContract, salt)
     * @dev evaluates to 0xb90aaffa4b0fc25d6056f438f2c06198968eaf6723d182f5f928441117424b8e
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_11110 =
        keccak256(
            'EIP712Domain(string version,uint256 chainId,address verifyingContract,bytes32 salt)'
        );

    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value 11111 (name, version, chainId, verifyingContract, salt)
     * @dev evaluates to 0xd87cd6ef79d4e2b95e15ce8abf732db51ec771f1ca2edccf22a46c729ac56472
     */
    bytes32 internal constant EIP_712_DOMAIN_HASH_11111 =
        keccak256(
            'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)'
        );

    /**
     * @notice calculate unique EIP-712 domain separator
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_00000()
        internal
        pure
        returns (bytes32 domainSeparator)
    {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_00000;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)

            domainSeparator := keccak256(pointer, 32)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_00001(
        bytes32 nameHash
    ) internal pure returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_00001;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)

            domainSeparator := keccak256(pointer, 64)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param versionHash hash of signing domain version
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_00010(
        bytes32 versionHash
    ) internal pure returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_00010;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), versionHash)

            domainSeparator := keccak256(pointer, 64)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param versionHash hash of signing domain version
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_00011(
        bytes32 nameHash,
        bytes32 versionHash
    ) internal pure returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_00011;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), versionHash)

            domainSeparator := keccak256(pointer, 96)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_00100()
        internal
        view
        returns (bytes32 domainSeparator)
    {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_00100;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), chainid())

            domainSeparator := keccak256(pointer, 64)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_00101(
        bytes32 nameHash
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_00101;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), chainid())

            domainSeparator := keccak256(pointer, 96)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param versionHash hash of signing domain version
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_00110(
        bytes32 versionHash
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_00110;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), versionHash)
            mstore(add(pointer, 64), chainid())

            domainSeparator := keccak256(pointer, 96)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param versionHash hash of signing domain version
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_00111(
        bytes32 nameHash,
        bytes32 versionHash
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_00111;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), versionHash)
            mstore(add(pointer, 96), chainid())

            domainSeparator := keccak256(pointer, 128)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_01000()
        internal
        view
        returns (bytes32 domainSeparator)
    {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_01000;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), address())

            domainSeparator := keccak256(pointer, 64)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_01001(
        bytes32 nameHash
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_01001;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), address())

            domainSeparator := keccak256(pointer, 96)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param versionHash hash of signing domain version
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_01010(
        bytes32 versionHash
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_01010;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), versionHash)
            mstore(add(pointer, 64), address())

            domainSeparator := keccak256(pointer, 96)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param versionHash hash of signing domain version
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_01011(
        bytes32 nameHash,
        bytes32 versionHash
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_01011;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), versionHash)
            mstore(add(pointer, 96), address())

            domainSeparator := keccak256(pointer, 128)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_01100()
        internal
        view
        returns (bytes32 domainSeparator)
    {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_01100;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), chainid())
            mstore(add(pointer, 64), address())

            domainSeparator := keccak256(pointer, 96)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_01101(
        bytes32 nameHash
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_01101;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), chainid())
            mstore(add(pointer, 96), address())

            domainSeparator := keccak256(pointer, 128)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param versionHash hash of signing domain version
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_01110(
        bytes32 versionHash
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_01110;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), versionHash)
            mstore(add(pointer, 64), chainid())
            mstore(add(pointer, 96), address())

            domainSeparator := keccak256(pointer, 128)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param versionHash hash of signing domain version
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_01111(
        bytes32 nameHash,
        bytes32 versionHash
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_01111;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), versionHash)
            mstore(add(pointer, 96), chainid())
            mstore(add(pointer, 128), address())

            domainSeparator := keccak256(pointer, 160)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_10000(
        bytes32 salt
    ) internal pure returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_10000;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), salt)

            domainSeparator := keccak256(pointer, 64)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_10001(
        bytes32 nameHash,
        bytes32 salt
    ) internal pure returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_10001;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), salt)

            domainSeparator := keccak256(pointer, 96)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param versionHash hash of signing domain version
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_10010(
        bytes32 versionHash,
        bytes32 salt
    ) internal pure returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_10010;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), versionHash)
            mstore(add(pointer, 64), salt)

            domainSeparator := keccak256(pointer, 96)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param versionHash hash of signing domain version
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_10011(
        bytes32 nameHash,
        bytes32 versionHash,
        bytes32 salt
    ) internal pure returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_10011;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), versionHash)
            mstore(add(pointer, 96), salt)

            domainSeparator := keccak256(pointer, 128)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_10100(
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_10100;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), chainid())
            mstore(add(pointer, 64), salt)

            domainSeparator := keccak256(pointer, 96)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_10101(
        bytes32 nameHash,
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_10101;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), chainid())
            mstore(add(pointer, 96), salt)

            domainSeparator := keccak256(pointer, 128)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param versionHash hash of signing domain version
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_10110(
        bytes32 versionHash,
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_10110;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), versionHash)
            mstore(add(pointer, 64), chainid())
            mstore(add(pointer, 96), salt)

            domainSeparator := keccak256(pointer, 128)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param versionHash hash of signing domain version
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_10111(
        bytes32 nameHash,
        bytes32 versionHash,
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_10111;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), versionHash)
            mstore(add(pointer, 96), chainid())
            mstore(add(pointer, 128), salt)

            domainSeparator := keccak256(pointer, 160)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_11000(
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_11000;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), address())
            mstore(add(pointer, 64), salt)

            domainSeparator := keccak256(pointer, 96)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_11001(
        bytes32 nameHash,
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_11001;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), address())
            mstore(add(pointer, 96), salt)

            domainSeparator := keccak256(pointer, 128)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param versionHash hash of signing domain version
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_11010(
        bytes32 versionHash,
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_11010;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), versionHash)
            mstore(add(pointer, 64), address())
            mstore(add(pointer, 96), salt)

            domainSeparator := keccak256(pointer, 128)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param versionHash hash of signing domain version
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_11011(
        bytes32 nameHash,
        bytes32 versionHash,
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_11011;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), versionHash)
            mstore(add(pointer, 96), address())
            mstore(add(pointer, 128), salt)

            domainSeparator := keccak256(pointer, 160)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_11100(
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_11100;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), chainid())
            mstore(add(pointer, 64), address())
            mstore(add(pointer, 96), salt)

            domainSeparator := keccak256(pointer, 128)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_11101(
        bytes32 nameHash,
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_11101;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), chainid())
            mstore(add(pointer, 96), address())
            mstore(add(pointer, 128), salt)

            domainSeparator := keccak256(pointer, 160)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param versionHash hash of signing domain version
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_11110(
        bytes32 versionHash,
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_11110;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), versionHash)
            mstore(add(pointer, 64), chainid())
            mstore(add(pointer, 96), address())
            mstore(add(pointer, 128), salt)

            domainSeparator := keccak256(pointer, 160)
        }
    }

    /**
     * @notice calculate unique EIP-712 domain separator
     * @param nameHash hash of human-readable signing domain name
     * @param versionHash hash of signing domain version
     * @param salt disambiguating salt
     * @return domainSeparator domain separator
     */
    function calculateDomainSeparator_11111(
        bytes32 nameHash,
        bytes32 versionHash,
        bytes32 salt
    ) internal view returns (bytes32 domainSeparator) {
        bytes32 typeHash = EIP_712_DOMAIN_HASH_11111;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            mstore(add(pointer, 32), nameHash)
            mstore(add(pointer, 64), versionHash)
            mstore(add(pointer, 96), chainid())
            mstore(add(pointer, 128), address())
            mstore(add(pointer, 160), salt)

            domainSeparator := keccak256(pointer, 192)
        }
    }
}
