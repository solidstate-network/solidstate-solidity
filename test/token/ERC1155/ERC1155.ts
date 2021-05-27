import { describeBehaviorOfERC1155 } from '@solidstate/spec/token/ERC1155/ERC1155.behavior';
import { ERC1155Mock, ERC1155Mock__factory } from '../../../typechain';
import { ethers } from 'hardhat';

const deploy = async () => {
  const [deployer] = await ethers.getSigners();
  return new ERC1155Mock__factory(deployer).deploy();
};

describe('ERC1155', function () {
  let instance: ERC1155Mock;

  beforeEach(async function () {
    instance = await deploy();
  });

  describeBehaviorOfERC1155(
    {
      deploy: async () => instance,
      mint: (recipient, tokenId, amount) =>
        instance['mint(address,uint256,uint256)'](recipient, tokenId, amount),
      burn: (recipient, tokenId, amount) =>
        instance['burn(address,uint256,uint256)'](recipient, tokenId, amount),
    },
    [],
  );
});
