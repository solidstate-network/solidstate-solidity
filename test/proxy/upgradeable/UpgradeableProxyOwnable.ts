import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfUpgradeableProxyOwnable } from '@solidstate/spec';
import {
  OwnableMock__factory,
  UpgradeableProxyOwnableMock,
  UpgradeableProxyOwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('UpgradeableProxyOwnable', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: UpgradeableProxyOwnableMock;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    const implementationInstance = await new OwnableMock__factory(
      deployer,
    ).deploy(ethers.ZeroAddress);

    instance = await new UpgradeableProxyOwnableMock__factory(deployer).deploy(
      await implementationInstance.getAddress(),
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
