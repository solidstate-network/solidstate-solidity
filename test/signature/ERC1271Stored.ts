import { ERC1271StoredMock, ERC1271StoredMock__factory } from '../../typechain';
import { describeBehaviorOfERC1271Stored } from '@solidstate/spec';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const validParams: [Uint8Array, Uint8Array] = [
  ethers.utils.randomBytes(32),
  ethers.utils.randomBytes(0),
];

describe('ERC1271Stored', function () {
  let instance: ERC1271StoredMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1271StoredMock__factory(deployer).deploy(
      validParams[0],
    );
  });

  describeBehaviorOfERC1271Stored({
    deploy: async () => instance as any,
    getValidParams: async () => validParams,
  });

  describe('__internal', function () {
    describe('#_isValidSignature(bytes32,bytes)', function () {
      it('returns true if signature is stored', async function () {
        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            validParams[0],
            validParams[1],
          ),
        ).to.be.true;
      });

      it('returns false if signature is not stored', async function () {
        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            ethers.utils.randomBytes(32),
            ethers.utils.randomBytes(0),
          ),
        ).to.be.false;
      });
    });

    describe('#_setValidSignature(bytes32,bool)', function () {
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
