import { describeBehaviorOfProxy } from '../../spec/proxy/Proxy.behavior';
import {
  Ownable,
  Ownable__factory,
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
    const [deployer] = await ethers.getSigners();
    implementation = await new Ownable__factory(deployer).deploy();
  });

  beforeEach(async function () {
    instance = await new ProxyMock__factory(deployer).deploy(
      implementation.address,
    );
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfProxy(
    {
      deploy: async () => instance,
      implementationFunction: 'owner()',
      implementationFunctionArgs: [],
    },
    [],
  );
});
