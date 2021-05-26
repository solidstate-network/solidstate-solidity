import { expect } from 'chai';
import { ethers } from 'ethers';

import { describeBehaviorOfOwnable } from './Ownable.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { SafeOwnable } from '../../typechain';

interface SafeOwnableBehaviorArgs {
  deploy: () => Promise<SafeOwnable>;
  getOwner: () => Promise<SignerWithAddress>;
  getNonOwner: () => Promise<SignerWithAddress>;
  getNomineeOwner: () => Promise<SignerWithAddress>;
}

export function describeBehaviorOfSafeOwnable(
  { deploy, getOwner, getNomineeOwner, getNonOwner }: SafeOwnableBehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::SafeOwnable', function () {
    let instance: SafeOwnable;
    let owner: SignerWithAddress;
    let nomineeOwner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    beforeEach(async function () {
      instance = await deploy();
      owner = await getOwner();
      nomineeOwner = await getNomineeOwner();
      nonOwner = await getNonOwner();
    });

    describeBehaviorOfOwnable(
      {
        deploy,
        getOwner,
        getNonOwner,
      },
      ['#transferOwnership', ...skips],
    );

    describe('#nomineeOwner', function () {
      it('returns address of nominee owner', async function () {
        expect(await instance.callStatic['nomineeOwner()']()).to.equal(
          ethers.constants.AddressZero,
        );
        await instance
          .connect(owner)
          ['transferOwnership(address)'](nomineeOwner.address);
        expect(await instance.callStatic['nomineeOwner()']()).to.equal(
          nomineeOwner.address,
        );
      });
    });

    describe('#transferOwnership', function () {
      it('does not set new owner', async function () {
        await instance
          .connect(owner)
          ['transferOwnership(address)'](nomineeOwner.address);
        expect(await instance.callStatic['owner()']()).to.equal(owner.address);
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

    describe('#acceptOwnership', function () {
      it('sets new owner', async function () {
        await instance
          .connect(owner)
          ['transferOwnership(address)'](nomineeOwner.address);

        await instance.connect(nomineeOwner)['acceptOwnership()']();
        expect(await instance.callStatic['owner()']()).to.equal(
          nomineeOwner.address,
        );
      });

      it('emits OwnershipTransferred event', async function () {
        await instance
          .connect(owner)
          ['transferOwnership(address)'](nomineeOwner.address);

        await expect(instance.connect(nomineeOwner)['acceptOwnership()']())
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, nomineeOwner.address);
      });
    });

    describe('reverts if', function () {
      it('sender is not nominee owner', async function () {
        await expect(
          instance.connect(nonOwner)['acceptOwnership()'](),
        ).to.be.revertedWith('SafeOwnable: sender must be nominee owner');
      });
    });
  });
}
