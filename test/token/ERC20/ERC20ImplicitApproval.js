const { expect } = require('chai');

const describeBehaviorOfERC20ImplicitApproval = require('@solidstate/spec/token/ERC20/ERC20ImplicitApproval.behavior.js');

const getImplicitlyApprovedSpender = async function () {
  const [signer] = await ethers.getSigners();
  return signer;
};

const deploy = async function () {
  const factory = await ethers.getContractFactory('ERC20ImplicitApprovalMock');
  const instance = await factory.deploy(
    [(await getImplicitlyApprovedSpender()).address]
  );
  return await instance.deployed();
};

describe('ERC20ImplicitApproval', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20ImplicitApproval({
    deploy: () => instance,
    supply: 0,
    mint: (recipient, amount) => instance.mint(recipient, amount),
    burn: (recipient, amount) => instance.burn(recipient, amount),
    getImplicitlyApprovedSpender,
  }, []);

  describe('__internal', function () {
    describe('#_isImplicitlyApproved', function () {
      it('returns implicit approval status of address', async function () {
        expect(
          await instance.callStatic['isImplicitlyApproved(address)'](
            ethers.constants.AddressZero
          )
        ).to.be.false;

        expect(
          await instance.callStatic['isImplicitlyApproved(address)'](
            (await getImplicitlyApprovedSpender()).address
          )
        ).to.be.true;
      });
    });
  });
});
