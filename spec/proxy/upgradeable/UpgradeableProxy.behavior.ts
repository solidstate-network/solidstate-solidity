import { describeBehaviorOfProxy, ProxyBehaviorArgs } from '../Proxy.behavior';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeFilter } from '@solidstate/library';
import { IUpgradeableProxy } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

interface UpgradeableProxyArgs extends ProxyBehaviorArgs {
  getOwner: () => Promise<SignerWithAddress>;
  getNonOwner: () => Promise<SignerWithAddress>;
}

export function describeBehaviorOfUpgradeableProxy(
  deploy: () => Promise<IUpgradeableProxy>,
  args: UpgradeableProxyArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::UpgradeableProxy', () => {
    let instance: IUpgradeableProxy;
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    beforeEach(async () => {
      instance = await deploy();
      owner = await args.getOwner();
      nonOwner = await args.getNonOwner();
    });

    describeBehaviorOfProxy(deploy, args, skips);

    describe('#setAdmin(address', () => {
      it('updates the admin address');

      it('emits');

      it('falls back to implementation if sender is not admin');
    });

    describe('#setImplementation(address)', () => {
      it('updates implementation address', async () => {
        const implementationFunction = 'fn';
        const abi = [
          `function ${implementationFunction} () external view returns (bool)`,
        ];

        const implementation = await deployMockContract(owner, abi);

        const contract = new ethers.Contract(
          await instance.getAddress(),
          abi,
          owner,
        );

        await expect(
          contract[implementationFunction].staticCall(),
        ).not.to.be.revertedWith('Mock on the method is not initialized');

        await instance.connect(owner).setImplementation(implementation.address);

        // call reverts, but with mock-specific message
        await expect(
          contract[implementationFunction].staticCall(),
        ).to.be.revertedWith('Mock on the method is not initialized');
      });

      it('emits');

      it('falls back to implementation if sender is not admin');
    });
  });
}
