import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC1271Stored } from '../../spec/signature/ERC1271Stored.behavior';
import { ERC1271StoredMock } from '../../typechain/ERC1271StoredMock';
import { ERC1271StoredMock__factory } from '../../typechain';

let validParams: [Uint8Array, Uint8Array] = [
  ethers.utils.randomBytes(32),
  ethers.utils.randomBytes(0),
];

let deploy = async function () {
  const [deployer] = await ethers.getSigners();
  return new ERC1271StoredMock__factory(deployer).deploy(
    validParams[0],
    validParams[1],
  );
};

describe('ERC1271Stored', function () {
  let instance: ERC1271StoredMock;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1271Stored(
    {
      deploy,
      getValidParams: async () => validParams,
    },
    [],
  );

  describe('__internal', function () {
    describe('#_isValidSignature', function () {
      it('returns true if signature is stored', async function () {
        expect(
          await instance.callStatic.__isValidSignature(
            validParams[0],
            validParams[1],
          ),
        ).to.be.true;
      });

      it('returns false if signature is not stored', async function () {
        expect(
          await instance.callStatic.__isValidSignature(
            ethers.utils.randomBytes(32),
            ethers.utils.randomBytes(0),
          ),
        ).to.be.false;
      });
    });

    describe('#_setValidSignature', function () {
      it('sets signature validity', async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = ethers.utils.randomBytes(0);

        expect(await instance.callStatic.__isValidSignature(hash, signature)).to
          .be.false;

        await instance.__setValidSignature(hash, true);

        expect(await instance.callStatic.__isValidSignature(hash, signature)).to
          .be.true;

        await instance.__setValidSignature(hash, false);

        expect(await instance.callStatic.__isValidSignature(hash, signature)).to
          .be.false;
      });
    });
  });
});
