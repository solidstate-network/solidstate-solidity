const describeBehaviorOfDiamondBase = require('./DiamondBase.behavior.js');

let deploy = async function () {
  let facetFactory = await ethers.getContractFactory('Ownable');
  let facetInstance = await facetFactory.deploy();
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
