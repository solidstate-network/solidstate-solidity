import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IOwnable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

interface OwnableBehaviorArgs {
  deploy: () => Promise<IOwnable>;
  getOwner: () => Promise<SignerWithAddress>;
  getNonOwner: () => Promise<SignerWithAddress>;
}

export function describeBehaviorOfOwnable(
  { deploy, getOwner, getNonOwner }: OwnableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::Ownable', function () {
    let instance: IOwnable;
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    beforeEach(async function () {
      instance = await deploy();
      owner = await getOwner();
      nonOwner = await getNonOwner();
    });

    describe('#owner()', function () {
      it('returns address of owner', async function () {
        expect(await instance.callStatic['owner()']()).to.equal(owner.address);
      });
    });

    describe('#transferOwnership(address)', function () {
      it('sets new owner', async function () {
        await instance
          .connect(owner)
          .transferOwnership(ethers.constants.AddressZero);
        expect(await instance.callStatic['owner()']()).to.equal(
          ethers.constants.AddressZero,
        );
      });

      it('emits OwnershipTransferred event', async function () {
        await expect(
          instance
            .connect(owner)
            .transferOwnership(ethers.constants.AddressZero),
        )
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, ethers.constants.AddressZero);
      });

      describe('reverts if', function () {
        it('sender is not owner', async function () {
          await expect(
            instance
              .connect(nonOwner)
              ['transferOwnership(address)'](nonOwner.address),
          ).to.be.revertedWith('Ownable: sender must be owner');
        });
      });
    });
  });
}
