import { ethers } from 'hardhat';
import { describeBehaviorOfDiamondBase } from '@solidstate/spec';
import {
  DiamondBaseMock,
  DiamondBaseMock__factory,
  Ownable__factory,
} from '../../../typechain';

describe('DiamondBase', function () {
  let instance: DiamondBaseMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    const facetInstance = await new Ownable__factory(deployer).deploy();

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
