import { ethers } from 'hardhat';
import { describeBehaviorOfECDSAMultisigWallet } from '@solidstate/spec';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ECDSAMultisigWalletMock,
  ECDSAMultisigWalletMock__factory,
} from '@solidstate/typechain';

describe('ECDSAMultisigWallet', function () {
  const quorum = ethers.constants.One;
  let signers: SignerWithAddress[];
  let nonSigner: SignerWithAddress;
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
