import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfERC1271Ownable } from '@solidstate/spec';
import {
  ERC1271OwnableMock,
  ERC1271OwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC1271Ownable', function () {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: ERC1271OwnableMock;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new ERC1271OwnableMock__factory(owner).deploy(
      owner.address,
    );
  });

  describeBehaviorOfERC1271Ownable({
    deploy: async () => instance as any,
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });

  describe('__internal', function () {
    describe('#_isValidSignature(bytes32,bytes)', function () {
      it('returns magic value for signature created by owner', async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = await owner.signMessage(ethers.utils.arrayify(hash));

        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            hash,
            signature,
          ),
        ).to.equal('0x1626ba7e');
      });

      it('returns null bytes for signature created by non-owner', async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = await nonOwner.signMessage(ethers.utils.arrayify(hash));

        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            hash,
            signature,
          ),
        ).to.equal('0x00000000');
      });
    });
  });
});
