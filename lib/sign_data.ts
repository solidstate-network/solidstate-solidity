import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';

export interface SignDataArgs {
  types: string[];
  values: any[];
  nonce: any;
  address: any;
}

export function hashData({ types, values, nonce, address }: SignDataArgs) {
  const hash = ethers.utils.solidityKeccak256(
    [...types, 'uint256', 'address'],
    [...values, nonce, address],
  );

  return ethers.utils.arrayify(hash);
}

export async function signData(signer: SignerWithAddress, data: SignDataArgs) {
  const signature = await signer.signMessage(hashData(data));

  return ethers.utils.arrayify(signature);
}
