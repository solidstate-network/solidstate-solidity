import { ethers } from 'hardhat';

// TODO: these no longer use bn and should be renamed or removed

export function bnToAddress(bn: any) {
  return ethers.getAddress(ethers.zeroPadValue(ethers.toBeHex(bn), 20));
}

export function bnToBytes32(bn: any) {
  return ethers.zeroPadValue(ethers.toBeHex(bn), 32);
}

export function bytes32ToNumber(bytes32: any) {
  return BigInt(bytes32);
}
