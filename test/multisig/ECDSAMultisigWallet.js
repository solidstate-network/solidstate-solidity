const describeBehaviorOfECDSAMultisigWallet = require('./ECDSAMultisigWallet.behavior.js');

let quorum = ethers.constants.One;

let getSigners = async function () {
  return (await ethers.getSigners()).slice(0, 3);
};

let getNonSigner = async function () {
  return (await ethers.getSigners())[3];
};

let deploy = async function () {
  let facetFactory = await ethers.getContractFactory('ECDSAMultisigWalletMock');
  let facetInstance = await facetFactory.deploy(
    (await getSigners()).map(s => s.address),
    (await getSigners()).length
  );
  return await facetInstance.deployed();
};

let signAuthorization = async function (signer, { target, data, value, delegate, nonce, address }) {
  let types = ['address', 'bytes', 'uint256', 'bool', 'uint256', 'address'];
  let values = [target, data, value, delegate, nonce, address];

  let hash = ethers.utils.solidityKeccak256(types, values);

  let signature = await signer.signMessage(ethers.utils.arrayify(hash));
  return ethers.utils.arrayify(signature);
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
    signAuthorization,
  });

  describe('__internal', function () {
    describe('#_verifySignatures', function () {
      it('todo');
    });
  });
});
