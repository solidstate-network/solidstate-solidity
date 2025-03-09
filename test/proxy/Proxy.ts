import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfProxy } from '@solidstate/spec';
import {
  $Ownable,
  $Ownable__factory,
  $Proxy,
  $Proxy__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Proxy', () => {
  let implementation: $Ownable;
  let instance: $Proxy;
  let deployer: SignerWithAddress;

  before(async () => {
    [deployer] = await ethers.getSigners();
    implementation = await new $Ownable__factory(deployer).deploy();
  });

  beforeEach(async () => {
    instance = await new $Proxy__factory(deployer).deploy();
    await instance.$_setImplementation(await implementation.getAddress());
  });

  describeBehaviorOfProxy(async () => instance, {
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
