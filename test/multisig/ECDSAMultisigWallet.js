const describeBehaviorOfECDSAMultisigWallet = require('./ECDSAMultisigWallet.behavior.js');

const quorum = ethers.constants.One;

const getSigners = async function () {
  return (await ethers.getSigners()).slice(0, 3);
};

const getNonSigner = async function () {
  return (await ethers.getSigners())[3];
};

const deploy = async function () {
  const factory = await ethers.getContractFactory('ECDSAMultisigWalletMock');
  const instance = await factory.deploy(
    (await getSigners()).map(s => s.address),
    quorum
  );
  return await instance.deployed();
};

describe('ECDSAMultisigWallet', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfECDSAMultisigWallet({
    deploy: () => instance,
    getSigners,
    getNonSigner,
    quorum,
  });

  describe('__internal', function () {
    describe('#_verifySignatures', function () {
      it('todo');
    });
  });
});
