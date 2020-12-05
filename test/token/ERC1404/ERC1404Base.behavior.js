const { expect } = require('chai');

const { describeBehaviorOfERC20Base } = require('../ERC20/ERC20Base.behavior.js');

const { describeFilter } = require('../../../lib/mocha_describe_filter.js');

const describeBehaviorOfERC1404Base = function ({ deploy, errors, supply }, skips = []) {
  const describe = describeFilter(skips);

  describe('::ERC1404Base', function () {
    let instance;

    beforeEach(async function () {
      instance = await deploy();
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC20Base({ deploy: () => instance, supply }, skips);

    // TODO: transfers blocked if restriction exists

    describe('#detectTransferRestriction', function () {
      it('returns zero if no restriction exists', async function () {
        expect(
          await instance.callStatic['detectTransferRestriction(address,address,uint256)'](
            ethers.constants.AddressZero,
            ethers.constants.AddressZero,
            ethers.constants.One
          )
        ).to.equal(0);
      });
    });

    describe('#messageForTransferRestriction', function () {
      it('returns empty string for unknown error code', async function () {
        expect(
          await instance.callStatic['messageForTransferRestriction(uint8)'](255)
        ).to.equal('');
      });

      for (let error of errors) {
        it(`returns "${ error.message }" for code ${ error.code }`, async function () {
          expect(
            await instance.callStatic['messageForTransferRestriction(uint8)'](error.code)
          ).to.equal(error.message);
        });
      }
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = { describeBehaviorOfERC1404Base };
