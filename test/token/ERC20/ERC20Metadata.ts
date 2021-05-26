import { describeBehaviorOfERC20Metadata } from '@solidstate/spec/token/ERC20/ERC20Metadata.behavior';
import { ERC20MetadataMock__factory } from '../../../typechain';

let name = 'ERC20Metadata.name';
let symbol = 'ERC20Metadata.symbol';
let decimals = 18;

let deploy = async function () {
  return new ERC20MetadataMock__factory().deploy(name, symbol, decimals);
};

describe('ERC20Metadata', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20Metadata(
    {
      deploy,
      name,
      symbol,
      decimals,
    },
    [],
  );
});
