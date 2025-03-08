import { describeBehaviorOfERC1155Metadata } from '@solidstate/spec';
import {
  __hh_exposed_ERC1155Metadata,
  __hh_exposed_ERC1155Metadata__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC1155Metadata', () => {
  const baseURI = 'ERC1155Metadata.baseURI';
  let instance: __hh_exposed_ERC1155Metadata;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_ERC1155Metadata__factory(
      deployer,
    ).deploy();

    await instance.__hh_exposed__setBaseURI(baseURI);
  });

  describeBehaviorOfERC1155Metadata(async () => instance, {
    baseURI,
  });
});
