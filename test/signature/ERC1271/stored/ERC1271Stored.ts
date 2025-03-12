import { describeBehaviorOfERC1271Stored } from '@solidstate/spec';
import {
  $ERC1271Stored,
  $ERC1271Stored__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const validParams: [Uint8Array, Uint8Array] = [
  ethers.randomBytes(32),
  ethers.randomBytes(0),
];

describe('ERC1271Stored', () => {
  let instance: $ERC1271Stored;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ERC1271Stored__factory(deployer).deploy();
    await instance.$_setValidSignature(validParams[0], true);
  });

  describeBehaviorOfERC1271Stored(async () => instance as any, {
    getValidParams: async () => validParams,
  });

  describe('__internal', () => {
    describe('#_isValidSignature(bytes32,bytes)', () => {
      it('returns magic value if signature is stored', async () => {
        expect(
          await instance.$_isValidSignature.staticCall(
            validParams[0],
            validParams[1],
          ),
        ).to.equal('0x1626ba7e');
      });

      it('returns null bytes if signature is not stored', async () => {
        expect(
          await instance.$_isValidSignature.staticCall(
            ethers.randomBytes(32),
            ethers.randomBytes(0),
          ),
        ).to.equal('0x00000000');
      });
    });

    describe('#_setValidSignature(bytes32,bool)', () => {
      it('sets signature validity', async () => {
        let hash = ethers.randomBytes(32);
        let signature = ethers.randomBytes(0);

        expect(
          await instance.$_isValidSignature.staticCall(hash, signature),
        ).to.equal('0x00000000');

        await instance.$_setValidSignature(hash, true);

        expect(
          await instance.$_isValidSignature.staticCall(hash, signature),
        ).to.equal('0x1626ba7e');

        await instance.$_setValidSignature(hash, false);

        expect(
          await instance.$_isValidSignature.staticCall(hash, signature),
        ).to.equal('0x00000000');
      });
    });
  });
});
