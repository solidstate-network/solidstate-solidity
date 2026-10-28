import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeBehaviorOfDiamondProxyWritable } from '@solidstate/spec';
import {
  type $DiamondProxyWritable,
  $DiamondProxyWritable__factory,
} from '@solidstate/typechain-types';
import { network } from 'hardhat';

const connection = await network.create();

describe('DiamondProxyWritable', () => {
  let proxyAdmin: HardhatEthersSigner;
  let nonProxyAdmin: HardhatEthersSigner;
  let instance: $DiamondProxyWritable;

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await connection.ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();
    instance = await new $DiamondProxyWritable__factory(deployer).deploy();

    await instance.$_setProxyAdmin(await deployer.getAddress());

    await instance.$_setSupportsInterface('0x01ffc9a7', true);
    await instance.$_setSupportsInterface('0x1f931c1c', true);
  });

  describeBehaviorOfDiamondProxyWritable(connection, async () => instance, {
    getProxyAdmin: async () => proxyAdmin,
    getNonProxyAdmin: async () => nonProxyAdmin,
    immutableSelectors: [],
  });
});
