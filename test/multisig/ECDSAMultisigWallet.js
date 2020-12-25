const describeBehaviorOfECDSAMultisigWallet = require('./ECDSAMultisigWallet.behavior.js');

let deploy = async function () {
  let facetFactory = await ethers.getContractFactory('ECDSAMultisigWalletMock');
  let facetInstance = await facetFactory.deploy(
    ethers.constants.One
  );
  return await facetInstance.deployed();
};

describe('ECDSAMultisigWallet', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfECDSAMultisigWallet({
    deploy,
  });
});
