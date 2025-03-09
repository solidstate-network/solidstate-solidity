import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfECDSAMultisigWallet } from '@solidstate/spec';
import {
  $ECDSAMultisigWallet,
  $ECDSAMultisigWallet__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ECDSAMultisigWallet', () => {
  const quorum = 1n;
  let signers: SignerWithAddress[];
  let nonSigner: SignerWithAddress;
  let instance: $ECDSAMultisigWallet;

  before(async () => {
    [nonSigner, ...signers] = (await ethers.getSigners()).slice(0, 4);
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ECDSAMultisigWallet__factory(deployer).deploy();

    for (const signer of signers) {
      await instance.$_addSigner(await signer.getAddress());
    }

    await instance.$_setQuorum(quorum);
  });

  describeBehaviorOfECDSAMultisigWallet(async () => instance, {
    getSigners: async () => signers,
    getNonSigner: async () => nonSigner,
    quorum,
    getVerificationAddress: async () => await instance.getAddress(),
  });

  describe('__internal', () => {
    describe('#_verifySignatures(bytes,(bytes,uint256)[])', () => {
      it('todo');
    });
  });
});
