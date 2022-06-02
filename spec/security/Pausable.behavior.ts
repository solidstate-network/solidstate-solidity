import { Pausable } from '../../typechain';
import { describeFilter } from '@solidstate/library';
import { expect } from 'chai';

interface PausableBehaviorArgs {
  deploy: () => Promise<Pausable>;
}

export function describeBehaviorOfPausable(
  { deploy }: PausableBehaviorArgs,
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
  });
}
