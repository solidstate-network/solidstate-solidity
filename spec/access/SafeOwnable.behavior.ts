import { expect } from 'chai';
import { BaseContract, ethers } from 'ethers';

import { describeBehaviorOfOwnable } from './Ownable.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { SafeOwnable } from '../../typechain';

interface SafeOwnableBehaviorArgs {
  deploy: () => Promise<BaseContract>;
  getOwner: () => SignerWithAddress;
  getNonOwner: () => SignerWithAddress;
  getNomineeOwner: () => SignerWithAddress;
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
      instance = (await deploy()) as SafeOwnable;
      owner = await getOwner();
      nomineeOwner = await getNomineeOwner();
      nonOwner = await getNonOwner();
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
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
        expect(await instance.callStatic.nomineeOwner()).to.equal(
          ethers.constants.AddressZero,
        );
        await instance.connect(owner).transferOwnership(nomineeOwner.address);
        expect(await instance.callStatic.nomineeOwner()).to.equal(
          nomineeOwner.address,
        );
      });
    });

    describe('#transferOwnership', function () {
      it('does not set new owner', async function () {
        await instance.connect(owner).transferOwnership(nomineeOwner.address);
        expect(await instance.callStatic.owner()).to.equal(owner.address);
      });

      describe('reverts if', function () {
        it('sender is not owner', async function () {
          await expect(
            instance.connect(nonOwner).transferOwnership(nonOwner.address),
          ).to.be.revertedWith('Ownable: sender must be owner');
        });
      });
    });

    describe('#acceptOwnership', function () {
      it('sets new owner', async function () {
        await instance.connect(owner).transferOwnership(nomineeOwner.address);

        await instance.connect(nomineeOwner).acceptOwnership();
        expect(await instance.callStatic.owner()).to.equal(
          nomineeOwner.address,
        );
      });

      it('emits OwnershipTransferred event', async function () {
        await instance.connect(owner).transferOwnership(nomineeOwner.address);

        await expect(instance.connect(nomineeOwner).acceptOwnership())
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, nomineeOwner.address);
      });
    });

    describe('reverts if', function () {
      it('sender is not nominee owner', async function () {
        await expect(
          instance.connect(nonOwner).acceptOwnership(),
        ).to.be.revertedWith('SafeOwnable: sender must be nominee owner');
      });
    });
  });
}

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfSafeOwnable;