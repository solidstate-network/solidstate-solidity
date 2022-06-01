import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfUpgradeableProxyOwnable } from '@solidstate/spec';
import {
  UpgradeableProxyOwnableMock,
  UpgradeableProxyOwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { deployMockContract } from 'ethereum-waffle';
import { ethers } from 'hardhat';

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

  describeBehaviorOfUpgradeableProxyOwnable(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });
});
