import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfTransparentBeaconProxy } from '@solidstate/spec';
import {
  $Ownable__factory,
  $TransparentBeaconProxy,
  $TransparentBeaconProxy__factory,
  ITransparentBeaconProxy,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('TransparentBeaconProxy', () => {
  let admin: SignerWithAddress;
  let nonAdmin: SignerWithAddress;
  let instance: $TransparentBeaconProxy;

  before(async () => {
    [admin, nonAdmin] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    const implementationInstance = await new $Ownable__factory(
      deployer,
    ).deploy();

    const beaconInstance = await deployMockContract(deployer, [
      'function implementation() external returns (address)',
    ]);

    await beaconInstance.mock.implementation.returns(
      await implementationInstance.getAddress(),
    );

    instance = (await new $TransparentBeaconProxy__factory(
      deployer,
    ).deploy()) as unknown as $TransparentBeaconProxy & ITransparentBeaconProxy;

    await instance.$_setBeacon(await beaconInstance.getAddress());
    await instance.$_setAdmin(await admin.getAddress());
  });

  describeBehaviorOfTransparentBeaconProxy(async () => instance, {
    getAdmin: async () => admin,
    getNonAdmin: async () => nonAdmin,
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

    describe('#_setBeacon(address)', () => {
      it('updates implementation address', async () => {
        const address = await instance.getAddress();

        expect(await instance.$_getBeacon.staticCall()).not.to.equal(address);

        await instance.$_setBeacon(address);

        expect(await instance.$_getBeacon.staticCall()).to.equal(address);
      });
    });
  });
});
