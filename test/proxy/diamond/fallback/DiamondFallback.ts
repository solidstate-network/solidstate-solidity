import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfDiamondFallback } from '@solidstate/spec';
import {
  DiamondFallbackMock,
  DiamondFallbackMock__factory,
  SafeOwnableMock__factory,
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
    const facetInstance = await new SafeOwnableMock__factory(deployer).deploy(
      deployer.address,
    );

    instance = await new DiamondFallbackMock__factory(deployer).deploy([
      {
        target: await facetInstance.getAddress(),
        action: 0,
        selectors: [
          facetInstance.interface.getFunction('nomineeOwner').selector,
        ],
      },
    ]);
  });

  describeBehaviorOfDiamondFallback(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    implementationFunction: 'nomineeOwner()',
    implementationFunctionArgs: [],
    fallbackAddress: ethers.ZeroAddress,
  });
});
