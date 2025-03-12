import { describeBehaviorOfSolidStateERC1155 } from '@solidstate/spec';
import {
  $SolidStateERC1155,
  $SolidStateERC1155__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const baseURI = 'ERC1155Metadata.baseURI';

describe('SolidStateERC1155', () => {
  let instance: $SolidStateERC1155;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $SolidStateERC1155__factory(deployer).deploy();

    await instance.$_setSupportsInterface('0x01ffc9a7', true);
    await instance.$_setSupportsInterface('0xd9b67a26', true);
  });

  describeBehaviorOfSolidStateERC1155(async () => instance, {
    transfer: (from, to, tokenId, amount) =>
      instance
        .connect(from)
        .safeTransferFrom(
          from.address,
          to.address,
          tokenId,
          amount,
          ethers.randomBytes(0),
        ),
    mint: (recipient, tokenId, amount) =>
      instance.$_mint(recipient, tokenId, amount, '0x'),
    burn: (recipient, tokenId, amount) =>
      instance.$_burn(recipient, tokenId, amount),
    baseURI,
  });
});
