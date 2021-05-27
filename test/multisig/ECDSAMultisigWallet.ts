import { ethers } from 'hardhat';
import { describeBehaviorOfECDSAMultisigWallet } from '@solidstate/spec/multisig/ECDSAMultisigWallet.behavior';
import {
  ECDSAMultisigWalletMock,
  ECDSAMultisigWalletMock__factory,
} from '../../typechain';

describe('ECDSAMultisigWallet', function () {
  const quorum = ethers.constants.One;
  let signers: any[];
  let nonSigner: any;
  let instance: ECDSAMultisigWalletMock;

  before(async function () {
    [nonSigner, ...signers] = (await ethers.getSigners()).slice(0, 4);
  });

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ECDSAMultisigWalletMock__factory(deployer).deploy(
      signers.map((s) => s.address),
      quorum,
    );
  });

  describeBehaviorOfECDSAMultisigWallet(
    {
      deploy: async () => instance,
      getSigners: async () => signers,
      getNonSigner: async () => nonSigner,
      quorum,
      getVerificationAddress: async () => instance.address,
    },
    [],
  );

  describe('__internal', function () {
    describe('#_verifySignatures', function () {
      it('todo');
    });
  });
});
