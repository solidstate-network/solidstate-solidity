const describeBehaviorOfProxy = require('@solidstate/spec/proxy/Proxy.behavior.js');

describe('Proxy', function () {
  let implementation;
  let instance;

  before(async function () {
    const implementationFactory = await ethers.getContractFactory('Ownable');
    implementation = await implementationFactory.deploy();
    await implementation.deployed();
  });

  beforeEach(async function () {
    const factory = await ethers.getContractFactory('ProxyMock');
    instance = await factory.deploy(
      implementation.address
    );
    return await instance.deployed();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfProxy({
    deploy: () => instance,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });
});
