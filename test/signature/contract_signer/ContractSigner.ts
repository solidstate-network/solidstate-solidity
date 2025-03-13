import { describeBehaviorOfContractSigner } from '@solidstate/spec';
import {
  $ContractSigner,
  $ContractSigner__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const validParams: [Uint8Array, Uint8Array] = [
  ethers.randomBytes(32),
  ethers.randomBytes(0),
];

const invalidParams: [Uint8Array, Uint8Array] = [
  ethers.randomBytes(32),
  ethers.randomBytes(0),
];

describe('ContractSigner', () => {
  let instance: $ContractSigner;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ContractSigner__factory(deployer).deploy();
    await instance.$_setValidSignature(validParams[0], true);
  });

  describeBehaviorOfContractSigner(async () => instance as any, {
    getValidParams: async () => validParams,
    getInvalidParams: async () => invalidParams,
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
