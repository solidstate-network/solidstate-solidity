const { describeBehaviorOfDiamondBase } = require('./DiamondBase.behavior.js');

let deploy = async function () {
  let [signer] = await ethers.getSigners();

  let facetFactory = await ethers.getContractFactory('OwnableMock');
  let facetInstance = await facetFactory.deploy(signer.address);
  await facetInstance.deployed();

  let factory = await ethers.getContractFactory('DiamondBaseMock');
  let instance = await factory.deploy([
    [
      facetInstance.address,
      facetInstance.interface.getSighash('owner()'),
    ],
  ]);
  return await instance.deployed();
};

describe('DiamondBase', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfDiamondBase({
    deploy,
    facetFunction: 'owner()',
    facetFunctionArgs: [],
  });
});
