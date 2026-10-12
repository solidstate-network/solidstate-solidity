import { describeFilter } from '@solidstate/library';
import type { Pausable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import type { NetworkConnection } from 'hardhat/types/network';

export interface PausableBehaviorArgs {}

export function describeBehaviorOfPausable(
  connection: NetworkConnection,
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
