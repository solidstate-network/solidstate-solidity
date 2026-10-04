import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { deployMockContract } from '@solidstate/library';
import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfBeaconProxy,
  type BeaconProxyBehaviorArgs,
} from '@solidstate/spec';
import type {
  ITransparentBeaconProxy,
  ITransparentBeaconProxyWithAdminFunctions,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import type { NetworkConnection } from 'hardhat/types/network';

interface TransparentBeaconProxyArgs extends BeaconProxyBehaviorArgs {
  getProxyAdmin: () => Promise<HardhatEthersSigner>;
  getNonProxyAdmin: () => Promise<HardhatEthersSigner>;
}

export function describeBehaviorOfTransparentBeaconProxy(
  connection: NetworkConnection,
  deploy: () => Promise<ITransparentBeaconProxy>,
  args: TransparentBeaconProxyArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::TransparentBeaconProxy', () => {
    let instance: ITransparentBeaconProxy;
    let instanceWithAdminFunctions: ITransparentBeaconProxyWithAdminFunctions;
    let proxyAdmin: HardhatEthersSigner;
    let nonProxyAdmin: HardhatEthersSigner;

    beforeEach(async () => {
      instance = await deploy();
      // events and errors are inherited from the base interface; only the admin functions are added
      instanceWithAdminFunctions = new ethers.Contract(
        await instance.getAddress(),
        [
          ...instance.interface.fragments.filter(
            (fragment) => fragment.type !== 'function',
          ),
          'function setProxyAdmin(address)',
          'function setBeacon(address)',
        ],
        instance.runner,
      ) as unknown as ITransparentBeaconProxyWithAdminFunctions;

      proxyAdmin = await args.getProxyAdmin();
      nonProxyAdmin = await args.getNonProxyAdmin();
    });

    describeBehaviorOfBeaconProxy(connection, deploy, args, skips);

    describe('#setProxyAdmin(address', () => {
      it('updates the admin address', async () => {
        await instanceWithAdminFunctions
          .connect(proxyAdmin)
          .setProxyAdmin(await nonProxyAdmin.getAddress());

        const adminSlotContents = await connection.ethers.provider.send(
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
            .setProxyAdmin(ethers.ZeroAddress),
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
