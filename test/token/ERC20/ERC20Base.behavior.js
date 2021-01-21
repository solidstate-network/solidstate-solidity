const { expect } = require('chai');

const { describeFilter } = require('../../../lib/mocha_describe_filter.js');

const describeBehaviorOfERC20Base = function ({ deploy, supply }, skips = []) {
  const describe = describeFilter(skips);

  describe('::ERC20Base', function () {
    let holder, spender;
    let instance;

    before(async function () {
      [holder, spender] = await ethers.getSigners();
    });

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#totalSupply', function () {
      it('returns the total supply of tokens', async function () {
        expect(await instance.callStatic['totalSupply()']()).to.equal(supply);
        // TODO: test delta
      });
    });

    describe('#balanceOf', function () {
      it('returns the token balance of given address', async function () {
        expect(await instance.callStatic['balanceOf(address)'](ethers.constants.AddressZero)).to.equal(0);
        // TODO: test delta
      });
    });

    describe('#allowance', function () {
      it('returns the allowance given holder has granted to given spender', async function () {
        expect(await instance.callStatic['allowance(address,address)'](holder.address, spender.address)).to.equal(0);

        let amount = ethers.constants.Two;
        await instance.connect(holder)['approve(address,uint256)'](spender.address, amount);

        expect(await instance.callStatic['allowance(address,address)'](holder.address, spender.address)).to.equal(amount);
      });
    });

    describe('#transfer', function () {
      it('todo');
    });

    describe('#transferFrom', function () {
      it('todo');
    });

    describe('#approve', function () {
      it('enables given spender to spend tokens on behalf of sender', async function () {
        let amount = ethers.constants.Two;
        await instance.connect(holder)['approve(address,uint256)'](spender.address, amount);

        expect(await instance.callStatic['allowance(address,address)'](holder.address, spender.address)).to.equal(amount);

        // TODO: test case is no different from #allowance test; tested further by #transferFrom tests
      });

      it('emits Approval event', async function () {
        let amount = ethers.constants.Two;

        await expect(
          instance.connect(holder)['approve(address,uint256)'](spender.address, amount)
        ).to.emit(
          instance, 'Approval'
        ).withArgs(
          holder.address, spender.address, amount
        );
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC20Base;
