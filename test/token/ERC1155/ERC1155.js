const describeBehaviorOfERC1155 = require('./ERC1155.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC1155Mock');
  let instance = await factory.deploy();
  return await instance.deployed();
};

describe('ERC1155', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1155({ deploy });
});
