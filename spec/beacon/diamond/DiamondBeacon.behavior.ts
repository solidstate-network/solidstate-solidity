import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfOwnable,
  type OwnableBehaviorArgs,
  type DiamondProxyWritableBehaviorArgs,
} from '@solidstate/spec';
import type { IDiamondBeacon } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import type { NetworkConnection } from 'hardhat/types/network';

export interface DiamondBeaconBehaviorArgs
  extends OwnableBehaviorArgs, DiamondProxyWritableBehaviorArgs {}

export function describeBehaviorOfDiamondBeacon(
  connection: NetworkConnection,
  deploy: () => Promise<IDiamondBeacon>,
  args: DiamondBeaconBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondBeacon', () => {
    let instance: IDiamondBeacon;
    let owner: HardhatEthersSigner;

    beforeEach(async () => {
      instance = await deploy();
      owner = await args.getOwner();
    });

    describeBehaviorOfOwnable(connection, deploy, args, skips);

    // TODO: can't use DiamondProxyWritable spec because it's incorrectly designed to rely on external DiamondProxy contract
    // describeBehaviorOfDiamondProxyWritable(connection, deploy, args, skips);

    describe('#diamondCut((address,enum,bytes4[])[],address,bytes)', () => {
      describe('reverts if', () => {
        it('target is not zero address', async () => {
          await expect(
            instance
              .connect(owner)
              .diamondCut([], await instance.getAddress(), '0x'),
          ).to.be.revertedWithCustomError(
            instance,
            'DiamondProxyWritable__InvalidInitializationParameters',
          );
        });

        it('data does not have zero length', async () => {
          await expect(
            instance.connect(owner).diamondCut([], ethers.ZeroAddress, '0x01'),
          ).to.be.revertedWithCustomError(
            instance,
            'DiamondProxyWritable__InvalidInitializationParameters',
          );
        });
      });
    });
  });
}
