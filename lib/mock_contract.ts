import { deployMockContract as deployWaffleMockContract } from '@ethereum-waffle/mock-contract';

export async function deployMockContract(ethersV6Signer: any, abi: any) {
  const ethersV5Signer = ethersV6Signer;

  ethersV5Signer._isSigner = true;

  return deployWaffleMockContract(ethersV5Signer, abi);
}
