import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfDiamondProxyWritable } from '@solidstate/spec';
import {
  $DiamondProxyWritable,
  $DiamondProxyWritable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondProxyWritable', () => {
  let proxyAdmin: SignerWithAddress;
  let nonProxyAdmin: SignerWithAddress;
  let instance: $DiamondProxyWritable;

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $DiamondProxyWritable__factory(deployer).deploy();

    await instance.$_setProxyAdmin(await deployer.getAddress());

    await instance.$_setSupportsInterface('0x01ffc9a7', true);
    await instance.$_setSupportsInterface('0x1f931c1c', true);
  });

  describeBehaviorOfDiamondProxyWritable(async () => instance, {
    getProxyAdmin: async () => proxyAdmin,
    getNonProxyAdmin: async () => nonProxyAdmin,
    immutableSelectors: [],
  });
});
