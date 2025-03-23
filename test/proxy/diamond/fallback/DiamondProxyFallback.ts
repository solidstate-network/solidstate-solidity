import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfDiamondProxyFallback } from '@solidstate/spec';
import {
  $DiamondProxyFallback,
  $DiamondProxyFallback__factory,
  $SafeOwnable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondProxyFallback', () => {
  let proxyAdmin: SignerWithAddress;
  let nonProxyAdmin: SignerWithAddress;
  let instance: $DiamondProxyFallback;

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
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

  describeBehaviorOfDiamondProxyFallback(async () => instance, {
    getProxyAdmin: async () => proxyAdmin,
    getNonProxyAdmin: async () => nonProxyAdmin,
    implementationFunction: 'nomineeOwner()',
    implementationFunctionArgs: [],
    fallbackAddress: ethers.ZeroAddress,
  });
});
