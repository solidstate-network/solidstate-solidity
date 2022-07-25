import {
  describeBehaviorOfERC20Base,
  ERC20BaseBehaviorArgs,
} from './ERC20Base.behavior';
import {
  describeBehaviorOfERC20Extended,
  ERC20ExtendedBehaviorArgs,
} from './ERC20Extended.behavior';
import {
  describeBehaviorOfERC20Metadata,
  ERC20MetadataBehaviorArgs,
} from './ERC20Metadata.behavior';
import {
  describeBehaviorOfERC20Permit,
  ERC20PermitBehaviorArgs,
} from './ERC20Permit.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidStateERC20 } from '@solidstate/typechain-types';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

export interface SolidStateERC20BehaviorArgs
  extends ERC20BaseBehaviorArgs,
    ERC20ExtendedBehaviorArgs,
    ERC20MetadataBehaviorArgs,
    ERC20PermitBehaviorArgs {}

export function describeBehaviorOfSolidStateERC20(
  deploy: () => Promise<ISolidStateERC20>,
  args: SolidStateERC20BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidStateERC20', function () {
    describeBehaviorOfERC20Base(deploy, args, skips);

    describeBehaviorOfERC20Extended(deploy, args, skips);

    describeBehaviorOfERC20Metadata(deploy, args, skips);

    describeBehaviorOfERC20Permit(deploy, args, skips);
  });
}
