import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { IERC20Permit, IERC5267 } from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const getDomain = async (instance: IERC5267) => {
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
    throw Error('Extensions not implemented');
  }

  return buildBasicDomain(
    fields,
    name,
    version,
    chainId,
    verifyingContract,
    salt,
  );
};

const fieldNames = [
  'name',
  'version',
  'chainId',
  'verifyingContract',
  'salt',
] as const;

/** Builds a domain object without extensions based on the return values of `eip712Domain()`. */
const buildBasicDomain = (
  fields: string,
  name: string,
  version: string,
  chainId: bigint,
  verifyingContract: string,
  salt: string,
) => {
  const domain = { name, version, chainId, verifyingContract, salt };

  for (const [i, fieldName] of fieldNames.entries()) {
    if (!(parseInt(fields) & (1 << i))) {
      delete domain[fieldName];
    }
  }

  return domain;
};

const signERC2612Permit = async (
  instance: IERC20Permit,
  owner: SignerWithAddress,
  spender: SignerWithAddress,
  amount: bigint,
  deadline: bigint = ethers.MaxUint256,
) => {
  const domain = await getDomain(instance);

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
