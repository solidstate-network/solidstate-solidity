import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IOwnable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface OwnableBehaviorArgs {
  getOwner: () => Promise<SignerWithAddress>;
  getNonOwner: () => Promise<SignerWithAddress>;
}

export function describeBehaviorOfOwnable(
  deploy: () => Promise<IOwnable>,
  { getOwner, getNonOwner }: OwnableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::Ownable', () => {
    let instance: IOwnable;
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    beforeEach(async () => {
      instance = await deploy();
      owner = await getOwner();
      nonOwner = await getNonOwner();
    });

    describe('#owner()', () => {
      it('returns address of owner', async () => {
        expect(await instance.owner.staticCall()).to.equal(owner.address);
      });
    });

    describe('#transferOwnership(address)', () => {
      it('sets new owner', async () => {
        await instance.connect(owner).transferOwnership(ethers.ZeroAddress);
        expect(await instance.owner.staticCall()).to.equal(ethers.ZeroAddress);
      });

      it('emits OwnershipTransferred event', async () => {
        await expect(
          instance.connect(owner).transferOwnership(ethers.ZeroAddress),
        )
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, ethers.ZeroAddress);
      });

      describe('reverts if', () => {
        it('sender is not owner', async () => {
          await expect(
            instance.connect(nonOwner).transferOwnership(nonOwner.address),
          ).to.be.revertedWithCustomError(instance, 'Ownable__NotOwner');
        });
      });
    });
  });
}
