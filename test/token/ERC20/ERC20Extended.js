const { describeBehaviorOfERC20Extended } = require('./ERC20Extended.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC20ExtendedMock');
  let instance = await factory.deploy();
  return await instance.deployed();
};

describe('ERC20Extended', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20Extended({ deploy, supply: 0 });
});
