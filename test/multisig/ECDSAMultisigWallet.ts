import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfECDSAMultisigWallet } from '@solidstate/spec';
import {
  ECDSAMultisigWalletMock,
  ECDSAMultisigWalletMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ECDSAMultisigWallet', () => {
  const quorum = 1n;
  let signers: SignerWithAddress[];
  let nonSigner: SignerWithAddress;
  let instance: ECDSAMultisigWalletMock;

  before(async () => {
    [nonSigner, ...signers] = (await ethers.getSigners()).slice(0, 4);
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ECDSAMultisigWalletMock__factory(deployer).deploy(
      signers.map((s) => s.address),
      quorum,
    );
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
