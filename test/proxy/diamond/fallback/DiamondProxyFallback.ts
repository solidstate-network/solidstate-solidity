import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeBehaviorOfDiamondProxyFallback } from '@solidstate/spec';
import {
  type $DiamondProxyFallback,
  $DiamondProxyFallback__factory,
  $SafeOwnable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'ethers';
import { network } from 'hardhat';

const connection = await network.create();

describe('DiamondProxyFallback', () => {
  let proxyAdmin: HardhatEthersSigner;
  let nonProxyAdmin: HardhatEthersSigner;
  let instance: $DiamondProxyFallback;

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await connection.ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();
    const facetInstance = await new $SafeOwnable__factory(deployer).deploy();

    instance = await new $DiamondProxyFallback__factory(deployer).deploy();

    await instance.$_setProxyAdmin(await deployer.getAddress());

    await instance.$_diamondCut(
      [
        {
          target: await facetInstance.getAddress(),
          action: 0,
          selectors: [
            facetInstance.interface.getFunction('nomineeOwner').selector,
          ],
        },
      ],
      ethers.ZeroAddress,
      '0x',
    );
  });

  describeBehaviorOfDiamondProxyFallback(connection, async () => instance, {
    getProxyAdmin: async () => proxyAdmin,
    getNonProxyAdmin: async () => nonProxyAdmin,
    implementationFunction: 'nomineeOwner()',
    implementationFunctionArgs: [],
    fallbackAddress: ethers.ZeroAddress,
  });
});
