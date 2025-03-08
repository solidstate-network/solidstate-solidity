import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfUpgradeableProxy } from '@solidstate/spec';
import {
  OwnableMock__factory,
  UpgradeableProxyMock,
  UpgradeableProxyMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('UpgradeableProxy', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: UpgradeableProxyMock;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    const implementationInstance = await new OwnableMock__factory(
      deployer,
    ).deploy(ethers.ZeroAddress);

    instance = await new UpgradeableProxyMock__factory(deployer).deploy(
      await implementationInstance.getAddress(),
      owner.address,
    );
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
        expect(await instance.__getImplementation.staticCall()).to.be
          .properAddress;
      });
    });

    describe('#_setImplementation(address)', () => {
      it('updates implementation address', async () => {
        const address = await instance.getAddress();

        expect(await instance.__getImplementation.staticCall()).not.to.equal(
          address,
        );

        await instance.__setImplementation(address);

        expect(await instance.__getImplementation.staticCall()).to.equal(
          address,
        );
      });
    });
  });
});
