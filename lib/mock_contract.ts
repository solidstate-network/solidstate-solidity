import { deployMockContract as deployWaffleMockContract } from './mock_contract_copy';

export async function deployMockContract(ethersV6Signer: any, abi: any) {
  const ethersV5Signer = ethersV6Signer;

  ethersV5Signer._isSigner = true;

  const waffleMock = await deployWaffleMockContract(ethersV5Signer, abi);

  const mock = Object.assign(waffleMock, {
    getAddress: async () => waffleMock.address,
  });

  return mock as any;
}
