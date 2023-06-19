import { deployMockContract } from '@ethereum-waffle/mock-contract';
import { describeBehaviorOfUpgradeableProxy } from '@solidstate/spec';
import {
  OwnableMock__factory,
  UpgradeableProxyMock,
  UpgradeableProxyMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('UpgradeableProxy', function () {
  let instance: UpgradeableProxyMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();

    const implementationInstance = await new OwnableMock__factory(
      deployer,
    ).deploy(ethers.ZeroAddress);

    instance = await new UpgradeableProxyMock__factory(deployer).deploy(
      implementationInstance.address,
    );
  });

  describeBehaviorOfUpgradeableProxy(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', function () {
    describe('#_getImplementation()', function () {
      it('returns implementation address', async function () {
        expect(await instance.__getImplementation.staticCall()).to.be
          .properAddress;
      });
    });

    describe('#_setImplementation(address)', function () {
      it('updates implementation address', async function () {
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
