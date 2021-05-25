import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Ownable } from '../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BaseContract } from 'ethers';
import { describeFilter } from '@solidstate/library/mocha_describe_filter';

interface OwnableBehaviorArgs {
  deploy: () => Promise<BaseContract>;
  getOwner: () => SignerWithAddress;
  getNonOwner: () => SignerWithAddress;
}

export function describeBehaviorOfOwnable(
  { deploy, getOwner, getNonOwner }: OwnableBehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::Ownable', function () {
    let instance: Ownable;
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    beforeEach(async function () {
      instance = (await deploy()) as Ownable;
      owner = await getOwner();
      nonOwner = await getNonOwner();
    });

    describe('#owner', function () {
      it('returns address of owner', async function () {
        expect(await instance.callStatic.owner()).to.equal(owner.address);
      });
    });

    describe('#transferOwnership', function () {
      it('sets new owner', async function () {
        await instance
          .connect(owner)
          .transferOwnership(ethers.constants.AddressZero);
        expect(await instance.callStatic.owner()).to.equal(
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
            instance.connect(nonOwner).transferOwnership(nonOwner.address),
          ).to.be.revertedWith('Ownable: sender must be owner');
        });
      });
    });
  });
}
