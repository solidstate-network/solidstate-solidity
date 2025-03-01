import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfNFTRoyalty } from '@solidstate/spec';
import {
  NFTRoyaltyMock,
  NFTRoyaltyMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('NFTRoyalty', () => {
  let royalty = 10000; // 10000 / 10000 = 100%
  let royalties = [
    0, // 0 / 10000 = 0%
    100, // 100 / 10000 = 1%
    1000, // 1000 / 10000 = 10%
    10001, // 10001 / 10000 = 101%
  ];

  let deployer: SignerWithAddress;
  let receiver: SignerWithAddress;

  let instance: NFTRoyaltyMock;

  before(async () => {
    [deployer, receiver] = await ethers.getSigners();

    instance = await new NFTRoyaltyMock__factory(deployer).deploy(
      royalty,
      royalties,
      await receiver.getAddress(),
    );
  });

  describeBehaviorOfNFTRoyalty(async () => instance);
});
