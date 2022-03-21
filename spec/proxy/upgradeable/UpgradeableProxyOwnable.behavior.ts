import { expect } from 'chai';
import { ethers } from 'hardhat';
import { deployMockContract } from 'ethereum-waffle';
import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfUpgradeableProxy } from './UpgradeableProxy.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { UpgradeableProxyOwnable } from '../../../typechain';

interface UpgradeableProxyOwnableArgs {
  deploy: () => Promise<UpgradeableProxyOwnable>;
  getOwner: () => Promise<SignerWithAddress>;
  getNonOwner: () => Promise<SignerWithAddress>;
  implementationFunction: string;
  implementationFunctionArgs: any[];
}

export function describeBehaviorOfUpgradeableProxyOwnable(
  {
    deploy,
    getOwner,
    getNonOwner,
    implementationFunction,
    implementationFunctionArgs,
  }: UpgradeableProxyOwnableArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::UpgradeableProxyOwnable', () => {
    let instance: UpgradeableProxyOwnable;
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    beforeEach(async () => {
      instance = await deploy();
      owner = await getOwner();
      nonOwner = await getNonOwner();
    });

    describeBehaviorOfUpgradeableProxy(
      {
        deploy,
        implementationFunction,
        implementationFunctionArgs,
      },
      [],
    );

    describe('#setImplementation(address)', () => {
      it('updates implementation address', async () => {
        const implementationFunction = 'fn';
        const abi = [
          `function ${implementationFunction} () external view returns (bool)`,
        ];

        const implementation = await deployMockContract(owner, abi);

        const contract = new ethers.Contract(instance.address, abi, owner);

        await expect(
          contract.callStatic[implementationFunction](),
        ).not.to.be.revertedWith('Mock on the method is not initialized');

        await instance.connect(owner).setImplementation(implementation.address);

        // call reverts, but with mock-specific message
        await expect(
          contract.callStatic[implementationFunction](),
        ).to.be.revertedWith('Mock on the method is not initialized');
      });

      describe('reverts if', () => {
        it('sender is not owner', async () => {
          await expect(
            instance
              .connect(nonOwner)
              .setImplementation(ethers.constants.AddressZero),
          ).to.be.revertedWith('Ownable: sender must be owner');
        });
      });
    });
  });
}
