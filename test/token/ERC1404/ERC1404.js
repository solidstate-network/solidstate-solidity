const describeBehaviorOfERC1404 = require('@solidstate/spec/token/ERC1404/ERC1404.behavior.js');

let restrictions = [
  { code: ethers.BigNumber.from(1), message: 'one' },
  { code: ethers.BigNumber.from(3), message: 'three' },
];

describe('ERC1404', function () {
  let instance;

  beforeEach(async function(){
    let factory = await ethers.getContractFactory('ERC1404Mock');
    instance = await factory.deploy(restrictions.map(r => r.code), restrictions.map(r => r.message));
    await instance.deployed();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1404({
    deploy: () => instance,
    mint: (recipient, amount) => instance.mint(recipient, amount),
    burn: (recipient, amount) => instance.burn(recipient, amount),
    restrictions,
    name: '',
    symbol: '',
    decimals: 0,
    supply: ethers.constants.Zero,
  }, []);
});
