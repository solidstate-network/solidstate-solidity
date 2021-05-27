import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC1271Stored } from '@solidstate/spec';
import {
  ERC1271StoredMock,
  ERC1271StoredMock__factory,
} from '@solidstate/typechain';

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
      validParams[1],
    );
  });

  describeBehaviorOfERC1271Stored({
    deploy: async () => instance,
    getValidParams: async () => validParams,
  });

  describe('__internal', function () {
    describe('#_isValidSignature', function () {
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
