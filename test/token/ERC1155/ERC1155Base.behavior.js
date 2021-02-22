const { expect } = require('chai');

const { describeFilter } = require('../../../lib/mocha_describe_filter.js');

const describeBehaviorOfERC165 = require('../../introspection/ERC165.behavior.js');

const describeBehaviorOfERC1155Base = function ({ deploy }, skips) {
  const describe = describeFilter(skips);

  describe('::ERC1155Base', function () {
    let holder, spender;
    let instance;

    before(async function () {
      [holder, spender] = await ethers.getSigners();
    });

    beforeEach(async function () {
      instance = await ethers.getContractAt('ERC1155Base', (await deploy()).address);
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC165({
      deploy: () => instance,
      interfaceIds: ['0xd9b67a26'],
    }, skips);

    describe('#balanceOf', function () {
      it('returns the balance of given token held by given address', async function () {
        expect(
          await instance.callStatic['balanceOf(address,uint256)'](holder.address, ethers.constants.Zero)
        ).to.equal(ethers.constants.Zero);
        // TODO: test delta
      });

      describe('reverts if', function () {
        it('balance of zero address is queried', async function () {
          await expect(
            instance.callStatic['balanceOf(address,uint256)'](ethers.constants.AddressZero, ethers.constants.Zero)
          ).to.be.revertedWith(
            'ERC1155: balance query for the zero address'
          );
        });
      });
    });

    describe('#balanceOfBatch', function () {
      it('returns the balances of given tokens held by given addresses', async function () {
        expect(
          await instance.callStatic['balanceOfBatch(address[],uint256[])']([holder.address], [ethers.constants.Zero])
        ).to.deep.have.members([ethers.constants.Zero]);
        // TODO: test delta
      });

      describe('reverts if', function () {
        it('input array lengths do not match', async function () {
          await expect(
            instance.callStatic['balanceOfBatch(address[],uint256[])']([holder.address], [])
          ).to.be.revertedWith(
            'ERC1155: accounts and ids length mismatch'
          );
        });

        it('balance of zero address is queried', async function () {
          await expect(
            instance.callStatic['balanceOfBatch(address[],uint256[])']([ethers.constants.AddressZero], [ethers.constants.Zero])
          ).to.be.revertedWith(
            'ERC1155: batch balance query for the zero address'
          );
        });
      });
    });

    describe('#isApprovedForAll', function () {
      it('returns whether given operator is approved to spend tokens of given account', async function () {
        expect(
          await instance.callStatic['isApprovedForAll(address,address)'](holder.address, spender.address)
        ).to.be.false;

        await instance.connect(holder)['setApprovalForAll(address,bool)'](spender.address, true);

        expect(
          await instance.callStatic['isApprovedForAll(address,address)'](holder.address, spender.address)
        ).to.be.true;
      });
    });

    describe('#setApprovalForAll', function () {
      it('approves given operator to spend tokens on behalf of sender', async function () {
        await instance.connect(holder)['setApprovalForAll(address,bool)'](spender.address, true);

        expect(
          await instance.callStatic['isApprovedForAll(address,address)'](holder.address, spender.address)
        ).to.be.true;

        // TODO: test case is no different from #isApprovedForAll test; tested further by #safeTransferFrom and #safeBatchTransferFrom tests
      });

      describe('reverts if', function () {
        it('given operator is sender', async function () {
          await expect(
            instance.connect(holder)['setApprovalForAll(address,bool)'](holder.address, true)
          ).to.be.revertedWith(
            'ERC1155: setting approval status for self'
          );
        });
      });
    });

    describe('#safeTransferFrom', function () {
      it('todo');
    });

    describe('#safeBatchTransferFrom', function () {
      it('todo');
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC1155Base;
