import { describeBehaviorOfERC1155Metadata } from '@solidstate/spec';
import {
  $ERC1155Metadata,
  $ERC1155Metadata__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC1155Metadata', () => {
  const baseURI = 'ERC1155Metadata.baseURI';
  let instance: $ERC1155Metadata;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ERC1155Metadata__factory(deployer).deploy();

    await instance.$_setBaseURI(baseURI);
  });

  describeBehaviorOfERC1155Metadata(async () => instance, {
    baseURI,
  });
});
