import {
  describeBehaviorOfBeaconProxy,
  BeaconProxyBehaviorArgs,
} from '../BeaconProxy.behavior';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeFilter } from '@solidstate/library';
import {
  ITransparentBeaconProxy,
  ITransparentBeaconProxyWithAdminFunctions,
  ITransparentBeaconProxyWithAdminFunctions__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

interface TransparentBeaconProxyArgs extends BeaconProxyBehaviorArgs {
  getProxyAdmin: () => Promise<SignerWithAddress>;
  getNonProxyAdmin: () => Promise<SignerWithAddress>;
}

export function describeBehaviorOfTransparentBeaconProxy(
  deploy: () => Promise<ITransparentBeaconProxy>,
  args: TransparentBeaconProxyArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::TransparentBeaconProxy', () => {
    let instance: ITransparentBeaconProxy;
    let instanceWithAdminFunctions: ITransparentBeaconProxyWithAdminFunctions;
    let proxyAdmin: SignerWithAddress;
    let nonProxyAdmin: SignerWithAddress;

    beforeEach(async () => {
      instance = await deploy();
      instanceWithAdminFunctions =
        ITransparentBeaconProxyWithAdminFunctions__factory.connect(
          await instance.getAddress(),
          instance.runner,
        );

      proxyAdmin = await args.getProxyAdmin();
      nonProxyAdmin = await args.getNonProxyAdmin();
    });

    describeBehaviorOfBeaconProxy(deploy, args, skips);

    describe('#setAdmin(address', () => {
      it('updates the admin address', async () => {
        await instanceWithAdminFunctions
          .connect(proxyAdmin)
          .setAdmin(await nonProxyAdmin.getAddress());

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
            .setAdmin(await nonProxyAdmin.getAddress()),
        )
          .to.emit(instanceWithAdminFunctions, 'AdminChanged')
          .withArgs(
            await proxyAdmin.getAddress(),
            await nonProxyAdmin.getAddress(),
          );
      });

      it('falls back to implementation if sender is not admin', async () => {
        const mock = await deployMockContract(proxyAdmin, [
          'function implementation() external returns (address)',
        ]);

        await mock.mock.implementation.returns(ethers.ZeroAddress);

        await instanceWithAdminFunctions
          .connect(proxyAdmin)
          .setBeacon(await mock.getAddress());

        await expect(
          instanceWithAdminFunctions
            .connect(nonProxyAdmin)
            .setAdmin(ethers.ZeroAddress),
        ).to.be.revertedWithCustomError(
          instance,
          'Proxy__ImplementationIsNotContract',
        );
      });
    });

    describe('#setBeacon(address)', () => {
      it('updates beacon address', async () => {
        const implementationFunction = 'fn';
        const abi = [
          `function ${implementationFunction} () external view returns (bool)`,
        ];

        const implementation = await deployMockContract(proxyAdmin, abi);
        const beacon = await deployMockContract(proxyAdmin, [
          'function implementation() external returns (address)',
        ]);

        await beacon.mock.implementation.returns(
          await implementation.getAddress(),
        );

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
          .setBeacon(await beacon.getAddress());

        // call reverts, but with mock-specific message
        await expect(
          contract[implementationFunction].staticCall(),
        ).to.be.revertedWith('Mock on the method is not initialized');
      });

      it('emits BeaconUpgraded event', async () => {
        await expect(
          instanceWithAdminFunctions
            .connect(proxyAdmin)
            .setBeacon(ethers.ZeroAddress),
        )
          .to.emit(instanceWithAdminFunctions, 'BeaconUpgraded')
          .withArgs(ethers.ZeroAddress);
      });

      it('falls back to implementation if sender is not admin', async () => {
        const mock = await deployMockContract(proxyAdmin, [
          'function implementation() external returns (address)',
        ]);

        await mock.mock.implementation.returns(ethers.ZeroAddress);

        await instanceWithAdminFunctions
          .connect(proxyAdmin)
          .setBeacon(await mock.getAddress());

        await expect(
          instanceWithAdminFunctions
            .connect(nonProxyAdmin)
            .setBeacon(ethers.ZeroAddress),
        ).to.be.revertedWithCustomError(
          instance,
          'Proxy__ImplementationIsNotContract',
        );
      });
    });
  });
}
