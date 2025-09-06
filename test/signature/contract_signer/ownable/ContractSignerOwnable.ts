import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfContractSignerOwnable } from '@solidstate/spec';
import {
  $ContractSignerOwnable,
  $ContractSignerOwnable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ContractSignerOwnable', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: $ContractSignerOwnable;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new $ContractSignerOwnable__factory(owner).deploy();
    await instance.$_setOwner(await owner.getAddress());
  });

  describeBehaviorOfContractSignerOwnable(async () => instance as any, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });

  describe('#_isValidSignature(bytes32,bytes)', () => {
    it('returns magic value for signature created by owner', async () => {
      const hash = ethers.randomBytes(32);
      const signature = await owner.signMessage(ethers.getBytes(hash));

      expect(
        await instance.$_isValidSignature.staticCall(hash, signature),
      ).to.equal('0x1626ba7e');
    });

    it('returns null bytes for signature created by non-owner', async () => {
      const hash = ethers.randomBytes(32);
      const signature = await nonOwner.signMessage(ethers.getBytes(hash));

      expect(
        await instance.$_isValidSignature.staticCall(hash, signature),
      ).to.equal('0x00000000');
    });
  });
});
