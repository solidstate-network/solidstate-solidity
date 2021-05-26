import { describeBehaviorOfDiamondBase } from '../../../spec/proxy/diamond/DiamondBase.behavior';
import { DiamondBaseMock__factory, Ownable__factory } from '../../../typechain';

const deploy = async function () {
  const facetInstance = await new Ownable__factory().deploy();

  return new DiamondBaseMock__factory().deploy([
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
