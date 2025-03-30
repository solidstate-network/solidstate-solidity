import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfOwnable,
  OwnableBehaviorArgs,
} from '@solidstate/spec';
import { DiamondProxyWritableBehaviorArgs } from '@solidstate/spec';
import { IDiamondBeacon } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';

export interface DiamondBeaconBehaviorArgs
  extends OwnableBehaviorArgs,
    DiamondProxyWritableBehaviorArgs {}

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

    // TODO: can't use DiamondProxyWritable spec because it's incorrectly designed to rely on external DiamondProxy contract
    // describeBehaviorOfDiamondProxyWritable(deploy, args, skips);

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
