import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfDiamondProxyFallback } from '@solidstate/spec';
import {
  $DiamondProxyFallback,
  $DiamondProxyFallback__factory,
  $SafeOwnable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondProxyFallback', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: $DiamondProxyFallback;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    const facetInstance = await new $SafeOwnable__factory(deployer).deploy();

    instance = await new $DiamondProxyFallback__factory(deployer).deploy();

    await instance.$_setOwner(await deployer.getAddress());

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
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    implementationFunction: 'nomineeOwner()',
    implementationFunctionArgs: [],
    fallbackAddress: ethers.ZeroAddress,
  });
});
