import { describeBehaviorOfERC1155Metadata } from '@solidstate/spec';
import {
  ERC1155MetadataMock,
  ERC1155MetadataMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC1155Metadata', function () {
  const tokenURI = 'ERC1155Metadata.tokenURI';
  let instance: ERC1155MetadataMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1155MetadataMock__factory(deployer).deploy(
      tokenURI,
    );
  });

  describeBehaviorOfERC1155Metadata({
    deploy: async () => instance,
    tokenURI,
  });
});
