import { ethers } from 'hardhat';

// TODO: rename to indicate that formula is from EIP-7201
export function seedToStorageSlot(seed: string): string {
  return (
    '0x' +
    (
      (BigInt(
        ethers.solidityPackedKeccak256(
          ['uint256'],
          [BigInt(ethers.solidityPackedKeccak256(['string'], [seed])) - 1n],
        ),
      ) /
        256n) *
      256n
    )
      .toString(16)
      .padStart(64, '0')
  );
}
