const describeBehaviorOfDiamondBase = require('./DiamondBase.behavior.js');

const deploy = async function () {
  const facetFactory = await ethers.getContractFactory('Ownable');
  const facetInstance = await facetFactory.deploy();
  await facetInstance.deployed();

  const factory = await ethers.getContractFactory('DiamondBaseMock');
  const instance = await factory.deploy([
    {
      target: facetInstance.address,
      action: 0,
      selectors: [
        facetInstance.interface.getSighash('owner()'),
      ],
    },
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
