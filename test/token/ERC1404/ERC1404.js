const { describeBehaviorOfERC1404 } = require('./ERC1404.behavior.js');

let errors = [
  { code: ethers.BigNumber.from(1), message: 'one' },
  { code: ethers.BigNumber.from(3), message: 'three' },
];

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC1404Mock');
  let instance = await factory.deploy(errors.map(e => e.code), errors.map(e => e.message));
  return await instance.deployed();
};

describe('ERC1404', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1404({ deploy, errors });
});
