const { expect } = require('chai');

const { describeFilter } = require('../../lib/mocha_describe_filter.js');

// eslint-disable-next-line no-empty-pattern
const describeBehaviorOfERC1271Base = function ({ deploy, getValidParams, getInvalidParams }, skips) {
  const describe = describeFilter(skips);

  describe('::ERC1271Base', function () {
    let instance;

    beforeEach(async function () {
      instance = await ethers.getContractAt('ERC1271Base', (await deploy()).address);
    });

    describe('#isValidSignature', function () {
      it('returns 0x1626ba7e for valid signature', async function () {
        expect(
          await instance.callStatic['isValidSignature(bytes32,bytes)'](
            ...await getValidParams()
          )
        ).to.equal('0x1626ba7e');
      });

      it('returns 0x00000000 for invalid signature', async function () {
        expect(
          await instance.callStatic['isValidSignature(bytes32,bytes)'](
            ...await getInvalidParams()
          )
        ).to.equal('0x00000000');
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC1271Base;
