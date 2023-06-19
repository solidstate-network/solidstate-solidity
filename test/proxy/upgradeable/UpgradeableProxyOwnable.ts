import { deployMockContract } from '@ethereum-waffle/mock-contract';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfUpgradeableProxyOwnable } from '@solidstate/spec';
import {
  OwnableMock__factory,
  UpgradeableProxyOwnableMock,
  UpgradeableProxyOwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('UpgradeableProxyOwnable', function () {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: UpgradeableProxyOwnableMock;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();

    const implementationInstance = await new OwnableMock__factory(
      deployer,
    ).deploy(ethers.ZeroAddress);

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
