import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfProxy } from '@solidstate/spec';
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
});
