import { ethers } from 'hardhat';
import { describeBehaviorOfERC721 } from '@solidstate/spec';
import { ERC721Mock, ERC721Mock__factory } from '../../../typechain';

const name = 'ERC721Metadata.name';
const symbol = 'ERC721Metadata.symbol';
const tokenURI = 'ERC721Metadata.tokenURI';

describe('ERC721', function () {
  let instance: ERC721Mock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC721Mock__factory(deployer).deploy(
      name,
      symbol,
      tokenURI,
    );
  });

  describeBehaviorOfERC721({
    deploy: async () => instance,
    supply: ethers.constants.Zero,
    mint: async (recipient, tokenId) =>
      instance['mint(address,uint256)'](recipient, tokenId),
    burn: async (tokenId) => instance['burn(uint256)'](tokenId),
    name,
    symbol,
    tokenURI,
  });
});
