import { describeFilter } from '@solidstate/library';
import { PartialPausable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface PartialPausableBehaviorArgs {}

export function describeBehaviorOfPartialPausable(
  deploy: () => Promise<PartialPausable>,
  args: PartialPausableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::PartialPausable', function () {
    let instance: PartialPausable;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#partialPaused(address)', function () {
      it('returns partialPaused(facet) == false', async function () {
        expect(
          await instance.partialPaused(ethers.constants.AddressZero),
        ).to.equal(false);
      });
    });
  });
}
