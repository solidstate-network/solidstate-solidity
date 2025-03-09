import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfProxy } from '@solidstate/spec';
import {
  __hh_exposed_Ownable,
  __hh_exposed_Ownable__factory,
  __hh_exposed_Proxy,
  __hh_exposed_Proxy__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Proxy', () => {
  let implementation: __hh_exposed_Ownable;
  let instance: __hh_exposed_Proxy;
  let deployer: SignerWithAddress;

  before(async () => {
    [deployer] = await ethers.getSigners();
    implementation = await new __hh_exposed_Ownable__factory(deployer).deploy();
  });

  beforeEach(async () => {
    instance = await new __hh_exposed_Proxy__factory(deployer).deploy();
    await instance.__hh_exposed__setImplementation(
      await implementation.getAddress(),
    );
  });

  describeBehaviorOfProxy(async () => instance, {
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
