const { expect } = require('chai');

const { describeFilter } = require('../../lib/mocha_describe_filter.js');

const describeBehaviorOfERC165 = function ({ deploy, interfaceIds }, skips = []) {
  const describe = describeFilter(skips);

  describe('::ERC165', function () {
    let instance;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#supportsInterface', function () {
      it('returns true for ERC165 interface', async function () {
        expect(
          await instance.callStatic['supportsInterface(bytes4)']('0x01ffc9a7')
        ).to.be.true;
      });

      it('returns false for unknown interface', async function () {
        expect(
          await instance.callStatic['supportsInterface(bytes4)']('0x00000000')
        ).to.be.false;
      });

      it('returns false for invalid interface', async function () {
        expect(
          await instance.callStatic['supportsInterface(bytes4)']('0xffffffff')
        ).to.be.false;
      });

      for (let interfaceId of interfaceIds) {
        it(`returns true for interface ${ interfaceId }`, async function () {
          expect(
            await instance.callStatic['supportsInterface(bytes4)'](interfaceId)
          ).to.be.true;
        });
      }
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC165;
