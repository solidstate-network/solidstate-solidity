import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfDiamondFallback } from '@solidstate/spec';
import {
  DiamondFallbackMock,
  DiamondFallbackMock__factory,
  OwnableMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondFallback', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: DiamondFallbackMock;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    const facetInstance = await new OwnableMock__factory(deployer).deploy(
      deployer.address,
    );

    instance = await new DiamondFallbackMock__factory(deployer).deploy([
      {
        target: await facetInstance.getAddress(),
        action: 0,
        selectors: [facetInstance.interface.getFunction('owner()').selector],
      },
    ]);
  });

  describeBehaviorOfDiamondFallback(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    facetFunction: 'owner()',
    facetFunctionArgs: [],
    fallbackAddress: ethers.ZeroAddress,
  });
});
