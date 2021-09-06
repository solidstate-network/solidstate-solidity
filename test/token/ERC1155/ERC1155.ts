import { ethers } from 'hardhat';
import { describeBehaviorOfERC1155 } from '@solidstate/spec';
import { ERC1155Mock, ERC1155Mock__factory } from '../../../typechain';

describe('ERC1155', function () {
  let instance: ERC1155Mock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1155Mock__factory(deployer).deploy();
  });

  describeBehaviorOfERC1155({
    deploy: async () => instance as any,
    mint: (recipient, tokenId, amount) =>
      instance.__mint(recipient, tokenId, amount),
    burn: (recipient, tokenId, amount) =>
      instance.__burn(recipient, tokenId, amount),
  });
});
