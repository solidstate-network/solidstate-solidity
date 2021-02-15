const describeBehaviorOfProxy = require('./Proxy.behavior.js');

let deploy = async function () {
  const implementationFactory = await ethers.getContractFactory('Ownable');
  const implementationInstance = await implementationFactory.deploy();
  await implementationInstance.deployed();

  const factory = await ethers.getContractFactory('ProxyMock');
  const instance = await factory.deploy(
    implementationInstance.address
  );
  return await instance.deployed();
};

describe('Proxy', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfProxy({
    deploy,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });
});
