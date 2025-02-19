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

  describe('::Pausable', () => {
    let instance: Pausable;

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('#paused()', () => {
      it('returns paused == false', async () => {
        expect(await instance.paused()).to.equal(false);
      });
    });
  });
}
