const describeBehaviorOfDiamondCuttable = require('./DiamondCuttable.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('DiamondCuttableMock');
  let instance = await factory.deploy();
  return await instance.deployed();
};

let deployFacet = async function () {
  let facetFactory = await ethers.getContractFactory('Ownable');
  let facetInstance = await facetFactory.deploy();
  return await facetInstance.deployed();
};

describe('DiamondCuttable', function () {
  let owner, nonOwner;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfDiamondCuttable({
    deploy,
    deployFacet,
    getOwner: () => owner,
    getNonOwner: () => nonOwner,
    facetFunction: 'owner()',
    facetFunctionArgs: [],
  });
});
