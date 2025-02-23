import {
  describeBehaviorOfOwnable,
  OwnableBehaviorArgs,
} from '../../../access/ownable/Ownable.behavior';
import {
  describeBehaviorOfDiamondReadable,
  describeBehaviorOfDiamondWritable,
  DiamondReadableBehaviorArgs,
  DiamondWritableBehaviorArgs,
} from '../../diamond';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IDiamondBeacon } from '@solidstate/typechain-types';

export interface DiamondBeaconBehaviorArgs
  extends OwnableBehaviorArgs,
    DiamondReadableBehaviorArgs,
    DiamondWritableBehaviorArgs {}

export function describeBehaviorOfDiamondBeacon(
  deploy: () => Promise<IDiamondBeacon>,
  args: DiamondBeaconBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondBeacon', () => {
    describeBehaviorOfOwnable(deploy, args, skips);

    describeBehaviorOfDiamondReadable(deploy, args, skips);

    // TODO: can't use DiamondWritable spec because it's incorrectly designed to rely on DiamondBase
    // describeBehaviorOfDiamondWritable(deploy, args, skips);
  });
}
