import { describeFilter } from '@solidstate/library';
import { PartiallyPausable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import type { NetworkConnection } from 'hardhat/types/network';

export interface PartiallyPausableBehaviorArgs {}

export function describeBehaviorOfPartiallyPausable(
  connection: NetworkConnection,
  deploy: () => Promise<PartiallyPausable>,
  args: PartiallyPausableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::PartiallyPausable', () => {
    let instance: PartiallyPausable;

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('#partiallyPaused()', () => {
      it('returns paused == false', async () => {
        const key = ethers.randomBytes(32);
        expect(await instance.partiallyPaused(key)).to.equal(false);
      });
    });
  });
}
