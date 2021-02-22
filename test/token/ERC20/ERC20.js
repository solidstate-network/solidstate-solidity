const describeBehaviorOfERC20 = require('./ERC20.behavior.js');

let name = 'ERC20Metadata.name';
let symbol = 'ERC20Metadata.symbol';
let decimals = 18;
let supply = ethers.utils.parseEther('1');

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC20Mock');
  let instance = await factory.deploy(name, symbol, decimals, supply);
  return await instance.deployed();
};

describe('ERC20', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20({
    deploy,
    name,
    symbol,
    decimals,
    supply,
  }, []);
});
