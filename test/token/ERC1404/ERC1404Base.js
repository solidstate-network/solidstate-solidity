const { describeBehaviorOfERC1404Base } = require('./ERC1404Base.behavior.js');

let errors = [
  { code: ethers.BigNumber.from(1), message: 'one' },
  { code: ethers.BigNumber.from(3), message: 'three' },
];

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC1404BaseMock');
  let instance = await factory.deploy(errors.map(e => e.code), errors.map(e => e.message));
  return await instance.deployed();
};

describe('ERC1404Base', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1404Base({ deploy, errors, supply: 0 });
});
