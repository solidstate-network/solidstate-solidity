import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

export function bnToAddress(bn: BigNumber) {
  return ethers.utils.getAddress(
    ethers.utils.hexZeroPad(ethers.utils.hexlify(bn), 20),
  );
}

export function bnToBytes32(bn: BigNumber) {
  return ethers.utils.hexZeroPad(ethers.utils.hexlify(bn), 32);
}
