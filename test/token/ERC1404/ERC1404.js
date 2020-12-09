const { describeBehaviorOfERC1404 } = require('./ERC1404.behavior.js');

let restrictions = [
  { code: ethers.BigNumber.from(1), message: 'one' },
  { code: ethers.BigNumber.from(3), message: 'three' },
];

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC1404Mock');
  let instance = await factory.deploy(restrictions.map(e => e.code), restrictions.map(e => e.message));
  return await instance.deployed();
};

describe('ERC1404', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1404({
    deploy,
    restrictions,
    name: '',
    symbol: '',
    decimals: 0,
    supply: 0,
  });
});
