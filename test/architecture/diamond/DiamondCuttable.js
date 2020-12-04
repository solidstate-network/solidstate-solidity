const { describeBehaviorOfDiamondCuttable } = require('./DiamondCuttable.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('DiamondCuttableMock');
  let instance = await factory.deploy();
  return await instance.deployed();
};

let deployFacet = async function () {
  let [signer] = await ethers.getSigners();

  let facetFactory = await ethers.getContractFactory('OwnableMock');
  let facetInstance = await facetFactory.deploy(signer.address);
  return await facetInstance.deployed();
};

describe('DiamondCuttable', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfDiamondCuttable({
    deploy,
    deployFacet,
    facetFunction: 'owner()',
    facetFunctionArgs: [],
  });
});
