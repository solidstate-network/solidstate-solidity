import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondProxyCommon } from '@solidstate/spec';
import {
  $DiamondProxyCommon,
  $DiamondProxyCommon__factory,
  $Ownable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('DiamondProxyCommon', () => {
  let deployer: HardhatEthersSigner;
  let receiver;
  let instance: $DiamondProxyCommon;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const facetInstance = await new $Ownable__factory(deployer).deploy();

    // empty mock contract used as second facet
    receiver = await deployMockContract(deployer, []);

    instance = await new $DiamondProxyCommon__factory(deployer).deploy();

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

  describeBehaviorOfDiamondProxyCommon(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('fallback()', () => {
    it('forwards ether transfer to facet associated with zero-bytes selector', async () => {
      const to = await instance.getAddress();
      const value = 1n;

      await expect(() =>
        deployer.sendTransaction({ to, value }),
      ).to.changeEtherBalance(instance, value);
    });
  });
});
