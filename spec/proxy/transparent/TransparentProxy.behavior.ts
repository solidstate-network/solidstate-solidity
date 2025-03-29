import { describeBehaviorOfProxy, ProxyBehaviorArgs } from '../Proxy.behavior';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeFilter } from '@solidstate/library';
import {
  ITransparentProxy,
  ITransparentProxyWithAdminFunctions,
  ITransparentProxyWithAdminFunctions__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

interface TransparentProxyArgs extends ProxyBehaviorArgs {}

export function describeBehaviorOfTransparentProxy(
  deploy: () => Promise<ITransparentProxy>,
  args: TransparentProxyArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::TransparentProxy', () => {
    let instance: ITransparentProxy;
    let instanceWithAdminFunctions: ITransparentProxyWithAdminFunctions;
    let proxyAdmin: SignerWithAddress;
    let nonProxyAdmin: SignerWithAddress;

    beforeEach(async () => {
      instance = await deploy();
      instanceWithAdminFunctions =
        ITransparentProxyWithAdminFunctions__factory.connect(
          await instance.getAddress(),
          instance.runner,
        );

      proxyAdmin = await args.getProxyAdmin();
      nonProxyAdmin = await args.getNonProxyAdmin();
    });

    describeBehaviorOfProxy(deploy, args, skips);

    describe('#setProxyAdmin(address', () => {
      it('updates the admin address', async () => {
        await instanceWithAdminFunctions
          .connect(proxyAdmin)
          .setProxyAdmin(await nonProxyAdmin.getAddress());

        const adminSlotContents = await ethers.provider.send(
          'eth_getStorageAt',
          [
            await instanceWithAdminFunctions.getAddress(),
            '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103',
          ],
        );

        expect(adminSlotContents).to.hexEqual(await nonProxyAdmin.getAddress());
      });

      it('emits AdminChanged event', async () => {
        await expect(
          instanceWithAdminFunctions
            .connect(proxyAdmin)
            .setProxyAdmin(await nonProxyAdmin.getAddress()),
        )
          .to.emit(instanceWithAdminFunctions, 'AdminChanged')
          .withArgs(
            await proxyAdmin.getAddress(),
            await nonProxyAdmin.getAddress(),
          );
      });

      it('falls back to implementation if sender is not admin', async () => {
        await instanceWithAdminFunctions
          .connect(proxyAdmin)
          .setImplementation(ethers.ZeroAddress);

        await expect(
          instanceWithAdminFunctions
            .connect(nonProxyAdmin)
            .setProxyAdmin(ethers.ZeroAddress),
        ).to.be.revertedWithCustomError(
          instance,
          'Proxy__ImplementationIsNotContract',
        );
      });
    });

    describe('#setImplementation(address)', () => {
      it('updates implementation address', async () => {
        const implementationFunction = 'fn';
        const abi = [
          `function ${implementationFunction} () external view returns (bool)`,
        ];

        const implementation = await deployMockContract(proxyAdmin, abi);

        const contract = new ethers.Contract(
          await instance.getAddress(),
          abi,
          proxyAdmin,
        );

        await expect(
          contract[implementationFunction].staticCall(),
        ).not.to.be.revertedWith('Mock on the method is not initialized');

        await instanceWithAdminFunctions
          .connect(proxyAdmin)
          .setImplementation(implementation.address);

        // call reverts, but with mock-specific message
        await expect(
          contract[implementationFunction].staticCall(),
        ).to.be.revertedWith('Mock on the method is not initialized');
      });

      it('emits Upgraded event', async () => {
        await expect(
          instanceWithAdminFunctions
            .connect(proxyAdmin)
            .setImplementation(ethers.ZeroAddress),
        )
          .to.emit(instanceWithAdminFunctions, 'Upgraded')
          .withArgs(ethers.ZeroAddress);
      });

      it('falls back to implementation if sender is not admin', async () => {
        await instanceWithAdminFunctions
          .connect(proxyAdmin)
          .setImplementation(ethers.ZeroAddress);

        await expect(
          instanceWithAdminFunctions
            .connect(nonProxyAdmin)
            .setImplementation(ethers.ZeroAddress),
        ).to.be.revertedWithCustomError(
          instance,
          'Proxy__ImplementationIsNotContract',
        );
      });
    });
  });
}
