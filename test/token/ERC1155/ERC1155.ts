import { describeBehaviorOfERC1155 } from '@solidstate/spec/token/ERC1155/ERC1155.behavior';
import { ERC1155Mock, ERC1155Mock__factory } from '../../../typechain';

const deploy = async () => {
  return new ERC1155Mock__factory().deploy();
};

describe('ERC1155', function () {
  let instance: ERC1155Mock;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1155(
    {
      deploy,
      mint: (recipient, tokenId, amount) =>
        instance.mint(recipient, tokenId, amount),
      burn: (recipient, tokenId, amount) =>
        instance.burn(recipient, tokenId, amount),
    },
    [],
  );
});
