const { expect } = require('chai');

const { describeFilter } = require('../../lib/mocha_describe_filter.js');

const describeBehaviorOfOwnable = function ({ deploy, getOwner }, skips = []) {
  const describe = describeFilter(skips);

  describe('::Ownable', function () {
    let instance;
    let owner;

    beforeEach(async function () {
      instance = await deploy();
      owner = await getOwner();
    });

    describe('#owner', function () {
      it('returns address of owner', async function () {
        expect(await instance.callStatic['owner()']()).to.equal(owner.address);
      });
    });

    describe('#transferOwnership', function () {
      it('sets new owner', async function () {
        await instance.connect(owner)['transferOwnership(address)'](ethers.constants.AddressZero);
        expect(await instance.callStatic['owner()']()).to.equal(ethers.constants.AddressZero);
      });

      it('emits OwnershipTransferred event', async function () {
        await expect(
          instance.connect(owner)['transferOwnership(address)'](ethers.constants.AddressZero)
        ).to.emit(
          instance, 'OwnershipTransferred'
        ).withArgs(
          owner.address, ethers.constants.AddressZero
        );
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfOwnable;
