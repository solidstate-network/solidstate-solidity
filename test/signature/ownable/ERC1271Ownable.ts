import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfERC1271Ownable } from '@solidstate/spec';
import {
  $ERC1271Ownable,
  $ERC1271Ownable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC1271Ownable', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: $ERC1271Ownable;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new $ERC1271Ownable__factory(owner).deploy();
    await instance.$_setOwner(await owner.getAddress());
  });

  describeBehaviorOfERC1271Ownable(async () => instance as any, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });

  describe('__internal', () => {
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
});
