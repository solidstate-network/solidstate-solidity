const describeBehaviorOfERC1155Enumerable = require('./ERC1155Enumerable.behavior.js');

describe('ERC1155Enumerable', function () {
  let instance;

  beforeEach(async function () {
    const factory = await ethers.getContractFactory('ERC1155EnumerableMock');
    instance = await factory.deploy();
    await instance.deployed();
  });
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1155Enumerable({
    deploy: () => instance,
    mint: (recipient, tokenId, amount) => instance.mint(recipient, tokenId, amount),
    burn: (recipient, tokenId, amount) => instance.burn(recipient, tokenId, amount),
  }, []);
});
