const { expect } = require('chai');

const describeBehaviorOfReentrancyGuard = require('@solidstate/spec/utils/ReentrancyGuard.behavior.js');

describe('ReentrancyGuard', function () {
  let instance;

  beforeEach(async function () {
    const factory = await ethers.getContractFactory('ReentrancyGuardMock');
    instance = await factory.deploy();
    await instance.deployed();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfReentrancyGuard({
    deploy: () => instance,
  }, []);

  describe('__internal', function () {
    describe('nonReentrant modifier', function () {
      describe('reverts if', function () {
        it('call is reentrant', async function () {
          await expect(
            instance.reentrancyTest()
          ).to.be.revertedWith(
            'ReentrancyGuard: reentrant call'
          );
        });

        it('call is cross-function reentrant', async function () {
          await expect(
            instance.reentrancyTest()
          ).to.be.revertedWith(
            'ReentrancyGuard: reentrant call'
          );
        });
      });
    });
  });
});
