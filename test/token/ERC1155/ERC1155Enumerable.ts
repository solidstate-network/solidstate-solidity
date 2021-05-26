import { describeBehaviorOfERC1155Enumerable } from '@solidstate/spec/token/ERC1155/ERC1155Enumerable.behavior';
import {
  ERC1155EnumerableMock,
  ERC1155EnumerableMock__factory,
} from '../../../typechain';

const deploy = async () => {
  return new ERC1155EnumerableMock__factory().deploy();
};

describe('ERC1155Enumerable', function () {
  let instance: ERC1155EnumerableMock;

  beforeEach(async function () {
    instance = await deploy();
  });
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1155Enumerable(
    {
      deploy: async () => instance,
      mint: (recipient, tokenId, amount) =>
        instance.mint(recipient, tokenId, amount),
      burn: (recipient, tokenId, amount) =>
        instance.burn(recipient, tokenId, amount),
    },
    [],
  );
});
