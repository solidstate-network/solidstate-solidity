import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { IERC2612, IERC5267 } from '@solidstate/typechain-types';
import { BytesLike, Signature } from 'ethers';
import { ethers } from 'hardhat';

interface Domain {
  fields?: string;
  name?: string;
  version?: string;
  chainId?: bigint;
  verifyingContract?: string;
  salt?: string;
  extensions?: bigint[];
}

const getDomain = async (instance: IERC5267): Promise<Domain> => {
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
): Domain => {
  const domain = { name, version, chainId, verifyingContract, salt };

  for (const [i, fieldName] of fieldNames.entries()) {
    if (!(parseInt(fields) & (1 << i))) {
      delete domain[fieldName];
    }
  }

  return domain;
};

const signERC2612Permit = async (
  instance: IERC2612 & IERC5267,
  owner: SignerWithAddress,
  spender: SignerWithAddress,
  amount: bigint,
  deadline: bigint = ethers.MaxUint256,
): Promise<Signature> => {
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

  return ethers.Signature.from(signature);
};

// TODO: rename file or move to new file
const signECDSAMetaTransaction = async (
  instance: IERC5267,
  signer: SignerWithAddress,
  msgData: BytesLike,
  nonce: bigint,
): Promise<Signature> => {
  const domain = await getDomain(instance);

  const types = {
    ECDSAMetaTransaction: [
      { name: 'msgData', type: 'bytes' },
      { name: 'nonce', type: 'uint256' },
    ],
  };

  const values = {
    msgData,
    nonce,
  };

  const signature = await signer.signTypedData(domain, types, values);

  return ethers.Signature.from(signature);
};

export { signERC2612Permit, signECDSAMetaTransaction };
