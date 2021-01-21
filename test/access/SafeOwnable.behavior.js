const { expect } = require('chai');

const describeBehaviorOfOwnable = require('./Ownable.behavior.js');

const { describeFilter } = require('../../lib/mocha_describe_filter.js');

const describeBehaviorOfSafeOwnable = function ({ deploy, getOwner, getNomineeOwner }, skips = []) {
  const describe = describeFilter(skips);

  describe('::SafeOwnable', function () {
    let instance;
    let owner;
    let nomineeOwner;

    beforeEach(async function () {
      instance = await ethers.getContractAt('SafeOwnable', (await deploy()).address);
      owner = await getOwner();
      nomineeOwner = await getNomineeOwner();
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfOwnable({ deploy, getOwner }, ['#transferOwnership']);

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
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfSafeOwnable;
