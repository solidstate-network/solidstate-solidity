import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfProxy } from '@solidstate/spec';
import {
  Ownable,
  OwnableMock__factory,
  ProxyMock,
  ProxyMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Proxy', () => {
  let implementation: Ownable;
  let instance: ProxyMock;
  let deployer: SignerWithAddress;

  before(async () => {
    [deployer] = await ethers.getSigners();
    implementation = await new OwnableMock__factory(deployer).deploy(
      deployer.address,
    );
  });

  beforeEach(async () => {
    instance = await new ProxyMock__factory(deployer).deploy(
      await implementation.getAddress(),
    );
  });

  describeBehaviorOfProxy(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  // TODO: implement _Proxy tests via hardhat-exposed
  // describe('__internal', () => {
  //   describe('#_getImplementation()', () => {
  //     it('returns implementation address', async () => {
  //       expect(await instance.__getImplementation.staticCall()).to.be
  //         .properAddress;
  //     });
  //   });

  //   describe('#_setImplementation(address)', () => {
  //     it('updates implementation address', async () => {
  //       const address = await instance.getAddress();

  //       expect(await instance.__getImplementation.staticCall()).not.to.equal(
  //         address,
  //       );

  //       await instance.__setImplementation(address);

  //       expect(await instance.__getImplementation.staticCall()).to.equal(
  //         address,
  //       );
  //     });
  //   });
  // });
});
