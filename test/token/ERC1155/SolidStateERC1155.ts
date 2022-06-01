import { describeBehaviorOfSolidStateERC1155 } from '@solidstate/spec';
import {
  SolidStateERC1155Mock,
  SolidStateERC1155Mock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const tokenURI = 'ERC1155Metadata.tokenURI';

describe('SolidStateERC1155', function () {
  let instance: SolidStateERC1155Mock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new SolidStateERC1155Mock__factory(deployer).deploy();
  });

  describeBehaviorOfSolidStateERC1155({
    deploy: async () => instance,
    transfer: (from, to, tokenId, amount) =>
      instance
        .connect(from)
        ['safeTransferFrom(address,address,uint256,uint256,bytes)'](
          from.address,
          to.address,
          tokenId,
          amount,
          ethers.utils.randomBytes(0),
        ),
    mint: (recipient, tokenId, amount) =>
      instance.__mint(recipient, tokenId, amount),
    burn: (recipient, tokenId, amount) =>
      instance.__burn(recipient, tokenId, amount),
    tokenURI,
  });
});
