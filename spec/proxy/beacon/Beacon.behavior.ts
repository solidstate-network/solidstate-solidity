import {
  describeBehaviorOfOwnable,
  OwnableBehaviorArgs,
} from '../../access/ownable/Ownable.behavior';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface BeaconBehaviorArgs extends OwnableBehaviorArgs {}

export function describeBehaviorOfBeacon(
  deploy: () => Promise<IBeacon>,
  args: BeaconBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::Beacon', () => {
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;
    let instance: IBeacon;

    beforeEach(async () => {
      owner = await args.getOwner();
      nonOwner = await args.getNonOwner();
      instance = await deploy();
    });

    describeBehaviorOfOwnable(deploy, args, skips);

    describe('#getImplementation()', () => {
      it('returns implementation address', async () => {
        expect(await instance.getImplementation.staticCall()).to.be
          .properAddress;
      });
    });

    describe('#setImplementation(address)', () => {
      it('updates implementation address', async () => {
        expect(await instance.getImplementation.staticCall()).to.eq(
          ethers.ZeroAddress,
        );

        const address = ethers.getAddress(
          ethers.zeroPadValue(ethers.randomBytes(20), 20),
        );

        await instance.connect(owner).setImplementation(address);

        expect(await instance.getImplementation.staticCall()).to.eq(address);
      });

      describe('reverts if', () => {
        it('sender is not owner', async () => {
          await expect(
            instance.connect(nonOwner).setImplementation(ethers.ZeroAddress),
          ).to.be.revertedWithCustomError(instance, 'Ownable__NotOwner');
        });
      });
    });
  });
}
