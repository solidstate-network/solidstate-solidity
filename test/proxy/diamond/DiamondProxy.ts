import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondProxy } from '@solidstate/spec';
import {
  type $DiamondProxy,
  $DiamondProxy__factory,
  $Ownable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import { network } from 'hardhat';

const connection = await network.create();

describe('DiamondProxy', () => {
  let deployer: HardhatEthersSigner;
  let proxyAdmin: HardhatEthersSigner;
  let nonProxyAdmin: HardhatEthersSigner;
  let receiver;
  let instance: $DiamondProxy;

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await connection.ethers.getSigners();
  });

  beforeEach(async () => {
    [deployer] = await connection.ethers.getSigners();
    const facetInstance = await new $Ownable__factory(deployer).deploy();

    // empty mock contract used as second facet
    receiver = await deployMockContract(deployer, []);

    instance = await new $DiamondProxy__factory(deployer).deploy();

    await instance.$_setProxyAdmin(await proxyAdmin.getAddress());

    await instance.$_diamondCut(
      [
        {
          target: await facetInstance.getAddress(),
          action: 0,
          selectors: [facetInstance.interface.getFunction('owner').selector],
        },
        {
          target: await receiver.getAddress(),
          action: 0,
          selectors: ['0x00000000'],
        },
      ],
      ethers.ZeroAddress,
      '0x',
    );
  });

  describeBehaviorOfDiamondProxy(connection, async () => instance, {
    getProxyAdmin: async () => proxyAdmin,
    getNonProxyAdmin: async () => nonProxyAdmin,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('fallback()', () => {
    it('forwards ether transfer to facet associated with zero-bytes selector', async () => {
      const to = await instance.getAddress();
      const value = 1n;

      await expect(() =>
        deployer.sendTransaction({ to, value }),
      ).to.changeEtherBalance(connection.ethers, instance, value);
    });
  });
});
