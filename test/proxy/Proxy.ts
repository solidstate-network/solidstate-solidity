import { describeBehaviorOfProxy } from '@solidstate/spec';
import {
  Ownable,
  OwnableMock__factory,
  ProxyMock,
  ProxyMock__factory,
} from '../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';

describe('Proxy', function () {
  let implementation: Ownable;
  let instance: ProxyMock;
  let deployer: SignerWithAddress;

  before(async function () {
    [deployer] = await ethers.getSigners();
    implementation = await new OwnableMock__factory(deployer).deploy(deployer.address);
  });

  beforeEach(async function () {
    instance = await new ProxyMock__factory(deployer).deploy(
      implementation.address,
    );
  });

  describeBehaviorOfProxy({
    deploy: async () => instance as any,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });
});
