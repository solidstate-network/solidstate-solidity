const describeBehaviorOfERC20Metadata = require('@solidstate/spec/token/ERC20/ERC20Metadata.behavior.js');

let name = 'ERC20Metadata.name';
let symbol = 'ERC20Metadata.symbol';
let decimals = 18;

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC20MetadataMock');
  let instance = await factory.deploy(name, symbol, decimals);
  return await instance.deployed();
};

describe('ERC20Metadata', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20Metadata({
    deploy,
    name,
    symbol,
    decimals,
    supply: ethers.constants.Zero,
  }, []);
});
