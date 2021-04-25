const describeBehaviorOfERC1155 = require('./ERC1155.behavior.js');

describe('ERC1155', function () {
  let instance;

  beforeEach(async function () {
    const factory = await ethers.getContractFactory('ERC1155Mock');
    instance = await factory.deploy();
    await instance.deployed();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1155({
    deploy: () => instance,
    mint: (recipient, tokenId, amount) => instance.mint(recipient, tokenId, amount),
    burn: (recipient, tokenId, amount) => instance.burn(recipient, tokenId, amount),
  });
});
