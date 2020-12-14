const describeBehaviorOfERC1404Base = require('./ERC1404Base.behavior.js');

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
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1404Base({ deploy, restrictions, supply: 0 });
});
