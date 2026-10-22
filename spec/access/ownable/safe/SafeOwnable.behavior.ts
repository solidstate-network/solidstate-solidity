import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfOwnable,
  type OwnableBehaviorArgs,
} from '@solidstate/spec';
import type { ISafeOwnable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import type { NetworkConnection } from 'hardhat/types/network';

export interface SafeOwnableBehaviorArgs extends OwnableBehaviorArgs {
  getNomineeOwner: () => Promise<HardhatEthersSigner>;
}

export function describeBehaviorOfSafeOwnable(
  connection: NetworkConnection,
  deploy: () => Promise<ISafeOwnable>,
  args: SafeOwnableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SafeOwnable', () => {
    let instance: ISafeOwnable;
    let owner: HardhatEthersSigner;
    let nomineeOwner: HardhatEthersSigner;
    let nonOwner: HardhatEthersSigner;

    beforeEach(async () => {
      instance = await deploy();
      owner = await args.getOwner();
      nomineeOwner = await args.getNomineeOwner();
      nonOwner = await args.getNonOwner();
    });

    describeBehaviorOfOwnable(connection, deploy, args, [
      '#transferOwnership(address)',
      ...(skips ?? []),
    ]);

    describe('#nomineeOwner()', () => {
      it('returns address of nominee owner', async () => {
        expect(await instance.nomineeOwner.staticCall()).to.equal(
          ethers.ZeroAddress,
        );
        await instance.connect(owner).transferOwnership(nomineeOwner.address);
        expect(await instance.nomineeOwner.staticCall()).to.equal(
          nomineeOwner.address,
        );
      });
    });

    describe('#transferOwnership(address)', () => {
      it('does not set new owner', async () => {
        await instance.connect(owner).transferOwnership(nomineeOwner.address);
        expect(await instance.owner.staticCall()).to.equal(owner.address);
      });

      describe('reverts if', () => {
        it('sender is not owner', async () => {
          await expect(
            instance.connect(nonOwner).transferOwnership(nonOwner.address),
          ).to.be.revertedWithCustomError(instance, 'Ownable__NotOwner');
        });
      });
    });

    describe('#acceptOwnership()', () => {
      it('sets new owner', async () => {
        await instance.connect(owner).transferOwnership(nomineeOwner.address);

        await instance.connect(nomineeOwner).acceptOwnership();
        expect(await instance.owner.staticCall()).to.equal(
          nomineeOwner.address,
        );
      });

      it('emits OwnershipTransferred event', async () => {
        await instance.connect(owner).transferOwnership(nomineeOwner.address);

        await expect(instance.connect(nomineeOwner).acceptOwnership())
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, nomineeOwner.address);
      });
    });

    describe('reverts if', () => {
      it('sender is not nominee owner', async () => {
        await expect(
          instance.connect(nonOwner).acceptOwnership(),
        ).to.be.revertedWithCustomError(
          instance,
          'SafeOwnable__NotNomineeOwner',
        );
      });
    });
  });
}
