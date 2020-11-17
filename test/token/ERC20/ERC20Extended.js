const { describeBehaviorOfERC20Extended } = require('./ERC20Extended.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC20ExtendedMock');
  let instance = await factory.deploy();
  await instance.deployed();
  return instance;
};

describe('ERC20Extended', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20Extended(deploy);
});
