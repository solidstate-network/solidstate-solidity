import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfUpgradeableProxy } from '@solidstate/spec';
import {
  __hh_exposed_Ownable__factory,
  __hh_exposed_UpgradeableProxy,
  __hh_exposed_UpgradeableProxy__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('UpgradeableProxy', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: __hh_exposed_UpgradeableProxy;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    const implementationInstance = await new __hh_exposed_Ownable__factory(
      deployer,
    ).deploy();

    instance = await new __hh_exposed_UpgradeableProxy__factory(
      deployer,
    ).deploy();

    await instance.__hh_exposed__setImplementation(
      await implementationInstance.getAddress(),
    );
    await instance.__hh_exposed__setOwner(await owner.getAddress());
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
        expect(await instance.__hh_exposed__getImplementation.staticCall()).to
          .be.properAddress;
      });
    });

    describe('#_setImplementation(address)', () => {
      it('updates implementation address', async () => {
        const address = await instance.getAddress();

        expect(
          await instance.__hh_exposed__getImplementation.staticCall(),
        ).not.to.equal(address);

        await instance.__hh_exposed__setImplementation(address);

        expect(
          await instance.__hh_exposed__getImplementation.staticCall(),
        ).to.equal(address);
      });
    });
  });
});
