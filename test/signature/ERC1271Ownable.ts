import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC1271Ownable } from '../../spec/signature/ERC1271Ownable.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ERC1271OwnableMock,
  ERC1271OwnableMock__factory,
} from '../../typechain';

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

  describeBehaviorOfERC1271Ownable(
    {
      deploy: async () => instance,
      getOwner: async () => owner,
      getNonOwner: async () => nonOwner,
    },
    [],
  );

  describe('__internal', function () {
    describe('#_isValidSignature', function () {
      it('returns true for signature created by owner', async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = await owner.signMessage(ethers.utils.arrayify(hash));

        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            hash,
            signature,
          ),
        ).to.be.true;
      });

      it('returns false for signature created by non-owner', async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = await nonOwner.signMessage(ethers.utils.arrayify(hash));

        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            hash,
            signature,
          ),
        ).to.be.false;
      });
    });
  });
});
