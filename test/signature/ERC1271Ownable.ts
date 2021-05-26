import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC1271Ownable } from '../../spec/signature/ERC1271Ownable.behavior';
import {
  ERC1271OwnableMock,
  ERC1271OwnableMock__factory,
} from '../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

let getOwner = async function () {
  let [signer] = await ethers.getSigners();
  return signer;
};

let getNonOwner = async function () {
  let [, signer] = await ethers.getSigners();
  return signer;
};

let deploy = async function () {
  const owner = await getOwner();
  return new ERC1271OwnableMock__factory(owner).deploy(owner.address);
};

describe('ERC1271Ownable', function () {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: ERC1271OwnableMock;

  beforeEach(async function () {
    owner = await getOwner();
    nonOwner = await getNonOwner();
    instance = await deploy();
  });

  describeBehaviorOfERC1271Ownable(
    {
      deploy,
      getOwner,
      getNonOwner,
    },
    [],
  );

  describe('__internal', function () {
    describe('#_isValidSignature', function () {
      it('returns true for signature created by owner', async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = await owner.signMessage(ethers.utils.arrayify(hash));

        expect(await instance.callStatic.__isValidSignature(hash, signature)).to
          .be.true;
      });

      it('returns false for signature created by non-owner', async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = await nonOwner.signMessage(ethers.utils.arrayify(hash));

        expect(await instance.callStatic.__isValidSignature(hash, signature)).to
          .be.false;
      });
    });
  });
});
