import { describeFilter } from '@solidstate/library';
import { PartiallyPausable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface PartiallyPausableBehaviorArgs {}

export function describeBehaviorOfPartiallyPausable(
  deploy: () => Promise<PartiallyPausable>,
  args: PartiallyPausableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::PartiallyPausable', function () {
    let instance: PartiallyPausable;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#partiallyPaused()', function () {
      it('returns paused == false', async function () {
        const key = ethers.utils.randomBytes(32);
        expect(await instance.partiallyPaused(key)).to.equal(false);
      });
    });
  });
}
