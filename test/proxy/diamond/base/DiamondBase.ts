import { describeBehaviorOfDiamondBase } from '@solidstate/spec';
import {
  DiamondBaseMock,
  DiamondBaseMock__factory,
  OwnableMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondBase', () => {
  let instance: DiamondBaseMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    const facetInstance = await new OwnableMock__factory(deployer).deploy(
      deployer.address,
    );

    instance = await new DiamondBaseMock__factory(deployer).deploy([
      {
        target: await facetInstance.getAddress(),
        action: 0,
        selectors: [facetInstance.interface.getFunction('owner()').selector],
      },
    ]);
  });

  describeBehaviorOfDiamondBase(async () => instance, {
    facetFunction: 'owner()',
    facetFunctionArgs: [],
  });
});
