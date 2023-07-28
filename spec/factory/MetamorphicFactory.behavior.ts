import {
  describeBehaviorOfFactory,
  FactoryBehaviorArgs,
} from './Factory.behavior';
import { describeFilter } from '@solidstate/library';
import { MetamorphicFactory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface MetaphoricFactoryBehaviorArgs extends FactoryBehaviorArgs {}

export function describeBehaviorOfMetamorphicFactory(
  deploy: () => Promise<MetamorphicFactory>,
  {}: MetaphoricFactoryBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::MetamorphicFactory', () => {
    let instance: MetamorphicFactory;

    beforeEach(async () => {
      instance = await deploy();
    });

    describeBehaviorOfFactory(deploy, {}, skips);

    describe('#getMetamorphicImplementation()', () => {
      // behavior changes during internal call but cannot be tested independently
      it('returns zero address', async () => {
        expect(
          await instance.getMetamorphicImplementation.staticCall(),
        ).to.equal(ethers.ZeroAddress);
      });
    });
  });
}
