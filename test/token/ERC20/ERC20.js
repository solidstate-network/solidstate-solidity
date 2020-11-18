const { describeBehaviorOfERC20Base } = require('./ERC20Base.behavior.js');
const { describeBehaviorOfERC20Extended } = require('./ERC20Extended.behavior.js');
const { describeBehaviorOfERC20Metadata } = require('./ERC20Metadata.behavior.js');

let name = 'ERC20Metadata.name';
let symbol = 'ERC20Metadata.symbol';
let supply = ethers.utils.parseEther('1');

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC20');
  let instance = await factory.deploy(name, symbol, supply);
  return await instance.deployed();
};

describe('ERC20', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20Base({ deploy, supply });
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20Extended({ deploy }, ['::ERC20Base']);
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20Metadata({ deploy, name, symbol, decimals: 18, supply }, ['::ERC20Base']);
});
