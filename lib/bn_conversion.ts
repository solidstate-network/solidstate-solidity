import { BigNumber, BigNumberish } from 'ethers';
import { ethers } from 'hardhat';

export function bnToAddress(bn: BigNumber | BigNumberish) {
  return ethers.getAddress(ethers.hexZeroPad(ethers.hexlify(bn), 20));
}

export function bnToBytes32(bn: BigNumber | BigNumberish) {
  return ethers.hexZeroPad(ethers.hexlify(bn), 32);
}

export function bytes32ToNumber(bytes32: string | BigNumber | BigNumberish) {
  return BigNumber.from(bytes32).toNumber();
}
