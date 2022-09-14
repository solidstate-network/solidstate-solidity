// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

/**
 * @title MerkleTree implementation
 * @dev derived from: https://www.researchgate.net/publication/342969698_End-to-End_Formal_Verification_of_Ethereum_20_Deposit_Smart_Contract
 */
library IncrementalMerkleTree {
    /**
     * @dev counterintuitively, height is such that at hashes[height][0] the root of the tree is stored
     */
    struct MerkleTree {
        mapping(uint256 => mapping(uint256 => bytes32)) hashes; //given by (h,i) where h is layer height, i is index in layer
        mapping(bytes32 => uint256) indexes;
        uint256 height;
        uint256 emptyIndex;
        bool initialized;
    }

    /**
     * @notice initializes a merkle tree
     * @param tree MerkleTree to initialize
     * @param height height of the MerkleTree
     * @param data array of bytes32 hashes to be stored in the tree's leaf nodes
     */
    function initializeTree(
        MerkleTree storage tree,
        uint256 height,
        bytes32[] calldata data
    ) internal {
        uint256 dataLength = data.length;
        uint256 leafNumber = 2 ^ height;

        require(tree.initialized == false, 'IMT: already initialized');
        require(dataLength < leafNumber, 'IMT: data overflow');

        unchecked {
            for (uint256 i; i < leafNumber; ) {
                if (i < dataLength) {
                    bytes32 hash = keccak256(abi.encode(data[i]));
                    tree.hashes[0][i] = hash;
                    tree.indexes[hash] = i;
                }
                ++i;
            }

            for (uint256 j = 1; j < height; ) {
                uint256 hashIndex;
                for (uint256 k = 0; k < leafNumber / (2**j); ) {
                    tree.hashes[j][k] = keccak256(
                        abi.encode(
                            tree.hashes[j - 1][hashIndex],
                            tree.hashes[j - 1][hashIndex + 1]
                        )
                    );
                    hashIndex += 2;
                }
                j++;
            }
        }

        tree.emptyIndex = dataLength;

        tree.height = height;
        tree.initialized = true;
    }

    /**
     * @notice updates a leaf node in a MerkleTree
     * @param tree the MerkleTree to update
     * @param index the index of the leaf node in the MerkleTree
     * @param hash the new hash to set in the leaf node
     */
    function updateNode(
        MerkleTree storage tree,
        uint256 index,
        bytes32 hash
    ) internal {
        require(index < 2 ^ tree.height, 'IMT: index out of bounds');

        bytes32 left;
        bytes32 right;
        uint256 height = tree.height;
        uint256 pairIndex = index % 2 == 0 ? index + 1 : index - 1;

        tree.hashes[0][index] = hash;
        tree.indexes[hash] = index;
        bytes32 pairHash = tree.hashes[0][pairIndex];

        if (pairIndex > index) {
            left = hash;
            right = pairHash;
        } else {
            left = pairHash;
            right = hash;
        }
        bytes32 nextUpHash = keccak256(abi.encode(left, right));

        for (uint256 i = 1; i < height; ) {
            uint256 nextUpIndex = index / (2**i);

            tree.hashes[i][nextUpIndex] = nextUpHash;

            if (nextUpIndex % 2 == 0) {
                left = nextUpHash;
                right = tree.hashes[i][nextUpIndex + 1];
            } else {
                left = tree.hashes[i][nextUpIndex - 1];
                right = nextUpHash;
            }

            nextUpHash = keccak256(abi.encode(left, right));
            ++i;
        }

        require(
            root(tree) ==
                keccak256(
                    abi.encodePacked(
                        tree.hashes[height - 2][0],
                        tree.hashes[height - 2][1]
                    )
                ),
            'root mismatch'
        );
    }

    /**
     * @notice returns the root of the MerkleTree
     * @param tree the MerkleTree whose root is fetched
     * @return root the root of the MerkleTree
     */
    function root(MerkleTree storage tree)
        internal
        view
        returns (bytes32 root)
    {
        root = tree.hashes[tree.height][0];
    }

    /**
     * @notice returns the index of a given leaf node hash
     * @param tree the MerkleTree to read from
     * @param hash the hash of the leaf node
     * @return index the index of the hash
     */
    function indexOf(MerkleTree storage tree, bytes32 hash)
        internal
        view
        returns (uint256 index)
    {
        index = tree.indexes[hash];
    }
}
