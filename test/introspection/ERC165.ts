import { describeBehaviorOfERC165 } from '../../spec/introspection/ERC165.behavior';
import { ERC165Mock__factory } from '../../typechain';

let deploy = async function () {
  return await ERC165Mock__factory().deploy();
};

describe('ERC165', function () {
  describeBehaviorOfERC165(
    {
      deploy,
      interfaceIds: [],
    },
    [],
  );
});
