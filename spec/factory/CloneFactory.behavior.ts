import {
  describeBehaviorOfFactory,
  FactoryBehaviorArgs,
} from './Factory.behavior';
import { describeFilter } from '@solidstate/library';
import { BaseContract } from 'ethers';

export interface CloneFactoryBehaviorArgs extends FactoryBehaviorArgs {}

export function describeBehaviorOfCloneFactory(
  deploy: () => Promise<BaseContract>,
  {}: CloneFactoryBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::CloneFactory', function () {
    describeBehaviorOfFactory(deploy, {}, skips);
  });
}
