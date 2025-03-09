import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { IERC20Permit } from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const signERC2612Permit = async (
  instance: IERC20Permit,
  owner: SignerWithAddress,
  spender: SignerWithAddress,
  amount: bigint,
  deadline: bigint = ethers.MaxUint256,
) => {
  const {
    fields,
    name,
    version,
    chainId,
    verifyingContract,
    salt,
    extensions,
  } = await instance.eip712Domain.staticCall();

  if (extensions.length > 0) {
    throw new Error('Extensions not implemented');
  }

  const domain = { name, version, chainId, verifyingContract };

  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const ownerAddress = await owner.getAddress();
  const spenderAddress = await spender.getAddress();
  const nonce = await instance.nonces.staticCall(ownerAddress);

  const values = {
    owner: ownerAddress,
    spender: spenderAddress,
    value: amount,
    nonce,
    deadline,
  };

  const signature = await owner.signTypedData(domain, types, values);

  const permit = ethers.Signature.from(signature);

  return permit;
};

export { signERC2612Permit };
