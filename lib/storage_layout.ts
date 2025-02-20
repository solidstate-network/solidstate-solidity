import { ethers } from 'hardhat';

export function seedToStorageSlot(seed: string) {
  return ethers.solidityPackedKeccak256(['string'], [seed]);
}
