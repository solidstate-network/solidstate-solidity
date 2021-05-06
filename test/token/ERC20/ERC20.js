const describeBehaviorOfERC20 = require('@solidstate/spec/token/ERC20/ERC20.behavior.js');

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18;
const supply = ethers.utils.parseEther('1');

describe('ERC20', function () {
  let instance;

  beforeEach(async function () {
    let factory = await ethers.getContractFactory('ERC20Mock');
    instance = await factory.deploy(name, symbol, decimals, supply);
    await instance.deployed();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20({
    deploy: () => instance,
    mint: (recipient, amount) => instance.mint(recipient, amount),
    burn: (recipient, amount) => instance.burn(recipient, amount),
    name,
    symbol,
    decimals,
    supply,
  }, []);
});
