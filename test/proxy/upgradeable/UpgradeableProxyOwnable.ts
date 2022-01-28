import { expect } from 'chai';
import { ethers } from 'hardhat';
import { deployMockContract } from 'ethereum-waffle';
import { describeBehaviorOfUpgradeableProxyOwnable } from '@solidstate/spec';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  UpgradeableProxyOwnableMock,
  UpgradeableProxyOwnableMock__factory,
} from '../../../typechain';

describe('UpgradeableProxyOwnable', function () {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: UpgradeableProxyOwnableMock;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const implementationFactory = await ethers.getContractFactory(
      'OwnableMock',
    );
    const implementationInstance = await implementationFactory.deploy(
      ethers.constants.AddressZero,
    );
    await implementationInstance.deployed();

    const [deployer] = await ethers.getSigners();
    instance = await new UpgradeableProxyOwnableMock__factory(deployer).deploy(
      implementationInstance.address,
      owner.address,
    );
  });

  describeBehaviorOfUpgradeableProxyOwnable({
    deploy: async () => instance as any,
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });
});
