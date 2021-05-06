const describeBehaviorOfERC1404Base = require('@solidstate/spec/token/ERC1404/ERC1404Base.behavior.js');

let restrictions = [
  { code: ethers.BigNumber.from(1), message: 'one' },
  { code: ethers.BigNumber.from(3), message: 'three' },
];

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC1404BaseMock');
  let instance = await factory.deploy(restrictions.map(e => e.code), restrictions.map(e => e.message));
  return await instance.deployed();
};

describe('ERC1404Base', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1404Base({
    deploy: () => instance,
    restrictions,
    supply: ethers.constants.Zero,
    mint: (recipient, amount) => instance.mint(recipient, amount),
    burn: (recipient, amount) => instance.burn(recipient, amount),
  }, []);
});
