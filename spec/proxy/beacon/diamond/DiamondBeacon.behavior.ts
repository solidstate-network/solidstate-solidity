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
import { expect } from 'chai';
import { ethers } from 'ethers';

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
    let instance: IDiamondBeacon;
    let owner: SignerWithAddress;

    beforeEach(async () => {
      instance = await deploy();
      owner = await args.getOwner();
    });

    describeBehaviorOfOwnable(deploy, args, skips);

    describeBehaviorOfDiamondReadable(deploy, args, skips);

    // TODO: can't use DiamondWritable spec because it's incorrectly designed to rely on DiamondBase
    // describeBehaviorOfDiamondWritable(deploy, args, skips);

    describe('#diamondCut((address,enum,bytes4[])[],address,bytes)', () => {
      describe('reverts if', () => {
        it('target is not zero address', async () => {
          await expect(
            instance
              .connect(owner)
              .diamondCut([], await instance.getAddress(), '0x'),
          ).to.be.revertedWithCustomError(
            instance,
            'DiamondBeacon__InvalidInput',
          );
        });

        it('data does not have zero length', async () => {
          await expect(
            instance.connect(owner).diamondCut([], ethers.ZeroAddress, '0x01'),
          ).to.be.revertedWithCustomError(
            instance,
            'DiamondBeacon__InvalidInput',
          );
        });
      });
    });
  });
}
