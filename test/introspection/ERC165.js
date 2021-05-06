const describeBehaviorOfERC165 = require('@solidstate/spec/introspection/ERC165.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC165Mock');
  let instance = await factory.deploy();
  return await instance.deployed();
};

describe('ERC165', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC165({
    deploy,
    interfaceIds: [],
  });
});
