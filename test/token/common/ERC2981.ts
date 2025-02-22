import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfERC2981 } from '@solidstate/spec';
import { ERC2981Mock, ERC2981Mock__factory } from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC2981', () => {
  let royalty = 10000; // 10000 / 10000 = 100%
  let royalties = [
    0, // 0 / 10000 = 0%
    100, // 100 / 10000 = 1%
    1000, // 1000 / 10000 = 10%
    10001, // 10001 / 10000 = 101%
  ];

  let deployer: SignerWithAddress;
  let receiver: SignerWithAddress;

  let instance: ERC2981Mock;

  before(async () => {
    [deployer, receiver] = await ethers.getSigners();

    instance = await new ERC2981Mock__factory(deployer).deploy(
      royalty,
      royalties,
      await receiver.getAddress(),
    );
  });

  describeBehaviorOfERC2981(async () => instance);
});
