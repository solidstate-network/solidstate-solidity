import { describeBehaviorOfDiamondBase } from '../../../spec/proxy/diamond/DiamondBase.behavior';
import { DiamondBaseMock__factory, Ownable__factory } from '../../../typechain';
import { ethers } from 'hardhat';

const deploy = async function () {
  const [deployer] = await ethers.getSigners();
  const facetInstance = await new Ownable__factory(deployer).deploy();

  return new DiamondBaseMock__factory(deployer).deploy([
    {
      target: facetInstance.address,
      action: 0,
      selectors: [facetInstance.interface.getSighash('owner()')],
    },
  ]);
};

describe('DiamondBase', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfDiamondBase(
    {
      deploy,
      facetFunction: 'owner()',
      facetFunctionArgs: [],
    },
    [],
  );
});
