import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondBase } from '@solidstate/spec';
import {
  DiamondBaseMock,
  DiamondBaseMock__factory,
  OwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('DiamondBase', () => {
  let deployer: HardhatEthersSigner;
  let receiver;
  let instance: DiamondBaseMock;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const facetInstance = await new OwnableMock__factory(deployer).deploy(
      deployer.address,
    );

    // empty mock contract used as second facet
    receiver = await deployMockContract(deployer, []);

    instance = await new DiamondBaseMock__factory(deployer).deploy([
      {
        target: await facetInstance.getAddress(),
        action: 0,
        selectors: [facetInstance.interface.getFunction('owner()').selector],
      },
      {
        target: await receiver.getAddress(),
        action: 0,
        selectors: ['0x00000000'],
      },
    ]);
  });

  describeBehaviorOfDiamondBase(async () => instance, {
    facetFunction: 'owner()',
    facetFunctionArgs: [],
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
