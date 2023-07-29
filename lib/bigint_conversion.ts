import { ethers } from 'hardhat';

// TODO: these no longer use bn and should be renamed or removed

export function bigintToAddress(bn: any) {
  return ethers.getAddress(ethers.zeroPadValue(ethers.toBeHex(bn), 20));
}

export function bigintToBytes32(bn: any) {
  return ethers.zeroPadValue(ethers.toBeHex(bn), 32);
}
