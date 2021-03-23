const describeBehaviorOfReentrancyGuard = require('./ReentrancyGuard.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('ReentrancyGuard');
  let instance = await factory.deploy();
  return await instance.deployed();
};

describe('ReentrancyGuard', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfReentrancyGuard({ deploy: () => instance });

  describe('__internal', function () {
    // TODO: modifier
    it('todo');
  });
});
