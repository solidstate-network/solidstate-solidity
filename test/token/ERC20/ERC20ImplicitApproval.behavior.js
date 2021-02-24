const { expect } = require('chai');

const describeBehaviorOfERC20Base = require('./ERC20Base.behavior.js');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfERC20ImplicitApproval = function ({ deploy, supply, getImplicitlyApprovedSpender }, skips) {
  const describe = describeFilter(skips);

  describe('::ERC20ImplicitApproval', function () {
    let implicitlyApprovedSpender;
    let instance;

    before(async function () {
      implicitlyApprovedSpender = await getImplicitlyApprovedSpender();
    });

    beforeEach(async function () {
      instance = await ethers.getContractAt('ERC20ImplicitApproval', (await deploy()).address);
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC20Base({
      deploy: () => instance,
      supply,
    }, skips);

    describe('#allowance', function () {
      it('returns maximum uint256 for implicitly approved spender', async function () {
        expect(
          await instance.callStatic['allowance(address,address)'](
            ethers.constants.AddressZero,
            implicitlyApprovedSpender.address
          )
        ).to.equal(
          ethers.constants.MaxUint256
        );
      });
    });

    describe('#transferFrom', function () {
      it('todo');
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC20ImplicitApproval;
