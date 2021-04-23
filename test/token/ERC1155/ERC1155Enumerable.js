const describeBehaviorOfERC1155Enumerable = require('./ERC1155Enumerable.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC1155EnumerableMock');
  let instance = await factory.deploy();
  return await instance.deployed();
};

describe('ERC1155Enumerable', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1155Enumerable({ deploy }, []);
});
