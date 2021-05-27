import { describeBehaviorOfECDSAMultisigWallet } from '../../spec/multisig/ECDSAMultisigWallet.behavior';
import { ethers } from 'hardhat';
import {
  ECDSAMultisigWalletMock,
  ECDSAMultisigWalletMock__factory,
} from '../../typechain';

const quorum = ethers.constants.One;

const getSigners = async function () {
  return (await ethers.getSigners()).slice(0, 3);
};

const getNonSigner = async function () {
  return (await ethers.getSigners())[3];
};

const deploy = async function () {
  const [deployer] = await ethers.getSigners();
  return new ECDSAMultisigWalletMock__factory(deployer).deploy(
    (await getSigners()).map((s) => s.address),
    quorum,
  );
};

describe('ECDSAMultisigWallet', function () {
  let instance: ECDSAMultisigWalletMock;

  beforeEach(async function () {
    instance = await deploy();
  });

  describeBehaviorOfECDSAMultisigWallet(
    {
      deploy: async () => instance,
      getSigners,
      getNonSigner,
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
