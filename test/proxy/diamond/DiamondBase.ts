import {
  DiamondBaseMock,
  DiamondBaseMock__factory,
  OwnableMock__factory,
} from '../../../typechain';
import { describeBehaviorOfDiamondBase } from '@solidstate/spec';
import { ethers } from 'hardhat';

describe('DiamondBase', function () {
  let instance: DiamondBaseMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    const facetInstance = await new OwnableMock__factory(deployer).deploy(
      deployer.address,
    );

    instance = await new DiamondBaseMock__factory(deployer).deploy([
      {
        target: facetInstance.address,
        action: 0,
        selectors: [facetInstance.interface.getSighash('owner()')],
      },
    ]);
  });

  describeBehaviorOfDiamondBase({
    deploy: async () => instance as any,
    facetFunction: 'owner()',
    facetFunctionArgs: [],
  });
});
