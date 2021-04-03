const describeBehaviorOfDiamondCuttable = require('./DiamondCuttable.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('DiamondCuttableMock');
  let instance = await factory.deploy();
  return await instance.deployed();
};

describe('DiamondCuttable', function () {
  let owner, nonOwner;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfDiamondCuttable({
    deploy,
    getOwner: () => owner,
    getNonOwner: () => nonOwner,
  });
});
