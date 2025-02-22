import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';

export interface SignDataArgs {
  types: string[];
  values: any[];
  nonce: any;
  address: any;
}

export function hashData({ types, values, nonce, address }: SignDataArgs) {
  const hash = ethers.solidityPackedKeccak256(
    [...types, 'uint256', 'address'],
    [...values, nonce, address],
  );

  return ethers.getBytes(hash);
}

export async function signData(signer: SignerWithAddress, data: SignDataArgs) {
  const signature = await signer.signMessage(hashData(data));

  return ethers.getBytes(signature);
}
