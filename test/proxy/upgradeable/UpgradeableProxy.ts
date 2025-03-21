import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfUpgradeableProxy } from '@solidstate/spec';
import {
  $Ownable__factory,
  $UpgradeableProxy,
  $UpgradeableProxy__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('UpgradeableProxy', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: $UpgradeableProxy;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    const implementationInstance = await new $Ownable__factory(
      deployer,
    ).deploy();

    instance = await new $UpgradeableProxy__factory(deployer).deploy();

    await instance.$_setImplementation(
      await implementationInstance.getAddress(),
    );
    await instance.$_setAdmin(await owner.getAddress());
  });

  describeBehaviorOfUpgradeableProxy(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', () => {
    describe('#_getImplementation()', () => {
      it('returns implementation address', async () => {
        expect(await instance.$_getImplementation.staticCall()).to.be
          .properAddress;
      });
    });

    describe('#_setImplementation(address)', () => {
      it('updates implementation address', async () => {
        const address = await instance.getAddress();

        expect(await instance.$_getImplementation.staticCall()).not.to.equal(
          address,
        );

        await instance.$_setImplementation(address);

        expect(await instance.$_getImplementation.staticCall()).to.equal(
          address,
        );
      });
    });
  });
});
