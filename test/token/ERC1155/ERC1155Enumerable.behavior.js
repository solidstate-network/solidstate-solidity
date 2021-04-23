const { expect } = require('chai');

const describeBehaviorOfERC1155Base = require('./ERC1155Base.behavior.js');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfERC1155Enumerable = function ({ deploy }, skips) {
  const describe = describeFilter(skips);

  // TODO: accept mint function as parameter
  // TODO: test burns

  describe('::ERC1155Enumerable', function () {
    let instance;

    beforeEach(async function () {
      instance = await ethers.getContractAt('ERC1155EnumerableMock', (await deploy()).address);
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC1155Base({
      deploy: () => instance,
    }, skips);

    describe('#totalSupply', function () {
      it('returns supply of given token', async function(){
        const [holder0, holder1] = await ethers.getSigners();
        const id = ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(await instance.callStatic.totalSupply(id)).to.equal(0);

        await instance.mint(holder0.address, id, amount, ethers.utils.randomBytes(0));

        expect(await instance.callStatic.totalSupply(id)).to.equal(amount);

        await instance.connect(holder0).safeTransferFrom(
          holder0.address,
          holder1.address,
          id,
          amount,
          ethers.utils.randomBytes(0)
        );

        expect(await instance.callStatic.totalSupply(id)).to.equal(amount);
      });
    });

    describe('#totalHolders', function () {
      it('returns number of holders of given token', async function(){
        const [holder0, holder1] = await ethers.getSigners();
        const id = ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(await instance.callStatic.totalHolders(id)).to.equal(0);

        await instance.mint(holder0.address, id, amount, ethers.utils.randomBytes(0));

        expect(await instance.callStatic.totalHolders(id)).to.equal(1);

        await instance.connect(holder0).safeTransferFrom(
          holder0.address,
          holder1.address,
          id,
          amount,
          ethers.utils.randomBytes(0)
        );

        expect(await instance.callStatic.totalHolders(id)).to.equal(1);
      });
    });

    describe('#accountsByToken', function () {
      it('returns list of addresses holding given token', async function(){
        const [holder0, holder1] = await ethers.getSigners();
        const id = ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(await instance.callStatic.accountsByToken(id)).to.eql([]);

        await instance.mint(holder0.address, id, amount, ethers.utils.randomBytes(0));

        expect(await instance.callStatic.accountsByToken(id)).to.eql([holder0.address]);

        await instance.connect(holder0).safeTransferFrom(
          holder0.address,
          holder1.address,
          id,
          amount,
          ethers.utils.randomBytes(0)
        );

        expect(await instance.callStatic.accountsByToken(id)).to.eql([holder1.address]);
      });
    });

    describe('#tokensByAccount', function () {
      it('returns list of tokens held by given address', async function(){
        const [holder0, holder1] = await ethers.getSigners();
        const id = ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(await instance.callStatic.tokensByAccount(holder0.address)).to.eql([]);
        expect(await instance.callStatic.tokensByAccount(holder1.address)).to.eql([]);

        await instance.mint(holder0.address, id, amount, ethers.utils.randomBytes(0));

        expect(await instance.callStatic.tokensByAccount(holder0.address)).to.eql([id]);
        expect(await instance.callStatic.tokensByAccount(holder1.address)).to.eql([]);

        await instance.connect(holder0).safeTransferFrom(
          holder0.address,
          holder1.address,
          id,
          amount,
          ethers.utils.randomBytes(0)
        );

        expect(await instance.callStatic.tokensByAccount(holder0.address)).to.eql([]);
        expect(await instance.callStatic.tokensByAccount(holder1.address)).to.eql([id]);
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC1155Enumerable;
