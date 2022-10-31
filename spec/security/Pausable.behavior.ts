import { describeFilter } from '@solidstate/library';
import { Pausable } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface PausableBehaviorArgs {}

export function describeBehaviorOfPausable(
  deploy: () => Promise<Pausable>,
  args: PausableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::Pausable', function () {
    let instance: Pausable;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#paused()', function () {
      it('returns paused == false', async function () {
        expect(await instance.paused()).to.equal(false);
      });
    });

    describe('#partiallyPaused(uint8)', function () {
      it('returns partialPaused(mask) == false', async function () {
        expect(await instance.partiallyPaused(1)).to.equal(false);
      });
    });
  });
}
