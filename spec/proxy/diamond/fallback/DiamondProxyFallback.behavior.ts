import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeFilter } from '@solidstate/library';
import {
  DiamondProxyBehaviorArgs,
  describeBehaviorOfDiamondProxy,
} from '@solidstate/spec';
import { IDiamondProxyFallback } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface DiamondProxyFallbackBehaviorArgs
  extends DiamondProxyBehaviorArgs {
  fallbackAddress: string;
}

export function describeBehaviorOfDiamondProxyFallback(
  deploy: () => Promise<IDiamondProxyFallback>,
  args: DiamondProxyFallbackBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondProxyFallback', () => {
    let instance: IDiamondProxyFallback;
    let proxyAdmin: SignerWithAddress;
    let nonProxyAdmin: SignerWithAddress;

    beforeEach(async () => {
      instance = await deploy();
      proxyAdmin = await args.getProxyAdmin();
      nonProxyAdmin = await args.getNonProxyAdmin();
    });

    describeBehaviorOfDiamondProxy(async () => instance, args, [
      'receive()',
      ...(skips ?? []),
    ]);

    describe('fallback()', () => {
      it('forwards data without matching selector to fallback contract', async () => {
        await expect(
          proxyAdmin.sendTransaction({
            to: await instance.getAddress(),
          }),
        ).to.be.revertedWithCustomError(
          instance,
          'Proxy__ImplementationIsNotContract',
        );
      });
    });

    describe('receive()', () => {
      it('forwards value to fallback contract', async () => {
        await expect(
          proxyAdmin.sendTransaction({
            to: await instance.getAddress(),
            value: 1n,
          }),
        ).to.be.revertedWithCustomError(
          instance,
          'Proxy__ImplementationIsNotContract',
        );
      });
    });

    describe('#getFallbackAddress()', () => {
      it('returns the fallback address', async () => {
        expect(await instance.getFallbackAddress.staticCall()).to.equal(
          args.fallbackAddress,
        );
      });
    });

    describe('#setFallbackAddress(address)', () => {
      it('updates the fallback address', async () => {
        const fallback = await deployMockContract(proxyAdmin, []);

        await instance.connect(proxyAdmin).setFallbackAddress(fallback.address);

        expect(await instance.getFallbackAddress.staticCall()).to.equal(
          fallback.address,
        );

        // call reverts, but with mock-specific message
        await expect(
          proxyAdmin.sendTransaction({
            to: await instance.getAddress(),
            data: ethers.hexlify(ethers.randomBytes(4)),
          }),
        ).to.be.revertedWith('Mock on the method is not initialized');
      });

      describe('reverts if', () => {
        it('sender is not proxy admin', async () => {
          await expect(
            instance
              .connect(nonProxyAdmin)
              .setFallbackAddress(ethers.ZeroAddress),
          ).to.be.revertedWithCustomError(instance, 'Proxy__SenderIsNotAdmin');
        });
      });
    });
  });
}
