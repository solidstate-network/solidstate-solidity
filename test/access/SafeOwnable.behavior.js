const { expect } = require('chai');

const describeBehaviorOfOwnable = require('./Ownable.behavior.js');

const { describeFilter } = require('../../lib/mocha_describe_filter.js');

const describeBehaviorOfSafeOwnable = function ({ deploy, getOwner, getNomineeOwner, getNonOwner }, skips = []) {
  const describe = describeFilter(skips);

  describe('::SafeOwnable', function () {
    let instance;
    let owner;
    let nomineeOwner;
    let nonOwner;

    beforeEach(async function () {
      instance = await ethers.getContractAt('SafeOwnable', (await deploy()).address);
      owner = await getOwner();
      nomineeOwner = await getNomineeOwner();
      nonOwner = await getNonOwner();
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfOwnable({
      deploy,
      getOwner,
      getNonOwner,
    }, ['#transferOwnership']);

    describe('#nomineeOwner', function () {
      it('returns address of nominee owner', async function () {
        expect(await instance.callStatic['nomineeOwner()']()).to.equal(ethers.constants.AddressZero);
        await instance.connect(owner)['transferOwnership(address)'](nomineeOwner.address);
        expect(await instance.callStatic['nomineeOwner()']()).to.equal(nomineeOwner.address);
      });
    });

    describe('#transferOwnership', function () {
      it('does not set new owner', async function () {
        await instance.connect(owner)['transferOwnership(address)'](nomineeOwner.address);
        expect(await instance.callStatic['owner()']()).to.equal(owner.address);
      });

      describe('reverts if', function () {
        it('sender is not owner', async function () {
          await expect(
            instance.connect(nonOwner)['transferOwnership(address)'](nonOwner.address)
          ).to.be.revertedWith(
            'Ownable: sender must be owner'
          );
        });
      });
    });

    describe('#acceptOwnership', function () {
      it('sets new owner', async function () {
        await instance.connect(owner)['transferOwnership(address)'](nomineeOwner.address);

        await instance.connect(nomineeOwner)['acceptOwnership()']();
        expect(await instance.callStatic['owner()']()).to.equal(nomineeOwner.address);
      });

      it('emits OwnershipTransferred event', async function () {
        await instance.connect(owner)['transferOwnership(address)'](nomineeOwner.address);

        await expect(
          instance.connect(nomineeOwner)['acceptOwnership()']()
        ).to.emit(
          instance, 'OwnershipTransferred'
        ).withArgs(
          owner.address, nomineeOwner.address
        );
      });
    });

    describe('reverts if', function () {
      it('sender is not nominee owner', async function () {
        await expect(
          instance.connect(nonOwner)['acceptOwnership()']()
        ).to.be.revertedWith(
          'SafeOwnable: sender must be nominee owner'
        );
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfSafeOwnable;
