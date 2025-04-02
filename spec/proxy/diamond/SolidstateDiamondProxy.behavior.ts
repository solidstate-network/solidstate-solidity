import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfDiamondProxy,
  DiamondProxyBehaviorArgs,
  describeBehaviorOfDiamondProxyFallback,
  DiamondProxyFallbackBehaviorArgs,
  describeBehaviorOfDiamondProxyReadable,
  DiamondProxyReadableBehaviorArgs,
  describeBehaviorOfDiamondProxyWritable,
  DiamondProxyWritableBehaviorArgs,
} from '@solidstate/spec';
import { ISolidstateDiamondProxy } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface SolidstateDiamondProxyBehaviorArgs
  extends DiamondProxyBehaviorArgs,
    DiamondProxyFallbackBehaviorArgs,
    DiamondProxyReadableBehaviorArgs,
    DiamondProxyWritableBehaviorArgs {}

export function describeBehaviorOfSolidstateDiamondProxy(
  deploy: () => Promise<ISolidstateDiamondProxy>,
  args: SolidstateDiamondProxyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateDiamondProxy', () => {
    let proxyAdmin: SignerWithAddress;
    let nonProxyAdmin: SignerWithAddress;

    let instance: ISolidstateDiamondProxy;

    before(async () => {
      proxyAdmin = await args.getProxyAdmin();
      nonProxyAdmin = await args.getNonProxyAdmin();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    describeBehaviorOfDiamondProxy(deploy, args, skips);

    describeBehaviorOfDiamondProxyFallback(deploy, args, [
      '::DiamondProxy',
      '::Ownable',
      ...(skips ?? []),
    ]);

    describeBehaviorOfDiamondProxyReadable(deploy, args, skips);

    describeBehaviorOfDiamondProxyWritable(deploy, args, skips);

    describe('#diamondCut((address,enum,bytes4[])[],address,bytes)', () => {
      const selectors: string[] = [];
      const abi: string[] = [];
      let facet: any;

      before(async () => {
        for (let i = 0; i < 24; i++) {
          const fn = `fn${i}()`;
          abi.push(`function ${fn}`);
          selectors.push(
            ethers.dataSlice(
              ethers.solidityPackedKeccak256(['string'], [fn]),
              0,
              4,
            ),
          );
        }

        facet = await deployMockContract(proxyAdmin, abi);
      });

      it('adds selectors one-by-one', async () => {
        const expectedSelectors = [];

        for (let selector of selectors) {
          await instance
            .connect(proxyAdmin)
            .diamondCut(
              [{ target: facet.address, action: 0, selectors: [selector] }],
              ethers.ZeroAddress,
              '0x',
            );

          expectedSelectors.push(selector);

          // call reverts, but with mock-specific message
          await expect(
            proxyAdmin.sendTransaction({
              to: await instance.getAddress(),
              data: selector,
            }),
          ).to.be.revertedWith('Mock on the method is not initialized');

          expect(
            Array.from(await instance.facets.staticCall()),
          ).to.have.deep.members([
            ...args.facetCuts.map((fc) => [fc.target, fc.selectors]),
            [facet.address, expectedSelectors],
          ]);

          expect(
            Array.from(
              await instance.facetFunctionSelectors.staticCall(facet.address),
            ),
          ).to.have.deep.members(expectedSelectors);

          expect(await instance.facetAddress.staticCall(selector)).to.equal(
            facet.address,
          );
        }
      });

      it('removes selectors one-by-one in ascending order of addition', async () => {
        await instance
          .connect(proxyAdmin)
          .diamondCut(
            [{ target: facet.address, action: 0, selectors }],
            ethers.ZeroAddress,
            '0x',
          );

        const expectedSelectors = [...selectors];

        for (let selector of selectors) {
          await instance.connect(proxyAdmin).diamondCut(
            [
              {
                target: ethers.ZeroAddress,
                action: 2,
                selectors: [selector],
              },
            ],
            ethers.ZeroAddress,
            '0x',
          );

          const last = expectedSelectors.pop();

          if (last && last !== selector) {
            expectedSelectors.splice(
              expectedSelectors.indexOf(selector),
              1,
              last,
            );

            // call reverts, but with mock-specific message
            await expect(
              proxyAdmin.sendTransaction({
                to: await instance.getAddress(),
                data: last,
              }),
            ).to.be.revertedWith('Mock on the method is not initialized');
          }

          await expect(
            proxyAdmin.sendTransaction({
              to: await instance.getAddress(),
              data: selector,
            }),
          ).to.be.revertedWithCustomError(
            instance,
            'Proxy__ImplementationIsNotContract',
          );

          expect(
            Array.from(await instance.facets.staticCall()),
          ).to.have.deep.members(
            [
              ...args.facetCuts.map((fc) => [fc.target, fc.selectors]),
              [facet.address, expectedSelectors],
            ].filter((f) => f[1].length),
          );

          expect(
            Array.from(
              await instance.facetFunctionSelectors.staticCall(facet.address),
            ),
          ).to.have.deep.members(expectedSelectors);

          expect(await instance.facetAddress.staticCall(selector)).to.equal(
            ethers.ZeroAddress,
          );
        }
      });

      it('removes selectors one-by-one in descending order of addition', async () => {
        await instance
          .connect(proxyAdmin)
          .diamondCut(
            [{ target: facet.address, action: 0, selectors }],
            ethers.ZeroAddress,
            '0x',
          );

        const expectedSelectors = [...selectors];

        for (let selector of [...selectors].reverse()) {
          await instance.connect(proxyAdmin).diamondCut(
            [
              {
                target: ethers.ZeroAddress,
                action: 2,
                selectors: [selector],
              },
            ],
            ethers.ZeroAddress,
            '0x',
          );

          const last = expectedSelectors.pop();

          if (last && last !== selector) {
            expectedSelectors.splice(
              expectedSelectors.indexOf(selector),
              1,
              last,
            );

            // call reverts, but with mock-specific message
            await expect(
              proxyAdmin.sendTransaction({
                to: await instance.getAddress(),
                data: last,
              }),
            ).to.be.revertedWith('Mock on the method is not initialized');
          }

          await expect(
            proxyAdmin.sendTransaction({
              to: await instance.getAddress(),
              data: selector,
            }),
          ).to.be.revertedWithCustomError(
            instance,
            'Proxy__ImplementationIsNotContract',
          );

          expect(
            Array.from(await instance.facets.staticCall()),
          ).to.have.deep.members(
            [
              ...args.facetCuts.map((fc) => [fc.target, fc.selectors]),
              [facet.address, expectedSelectors],
            ].filter((f) => f[1].length),
          );

          expect(
            Array.from(
              await instance.facetFunctionSelectors.staticCall(facet.address),
            ),
          ).to.have.deep.members(expectedSelectors);

          expect(await instance.facetAddress.staticCall(selector)).to.equal(
            ethers.ZeroAddress,
          );
        }
      });

      it('removes selectors one-by-one in random order', async () => {
        await instance
          .connect(proxyAdmin)
          .diamondCut(
            [{ target: facet.address, action: 0, selectors }],
            ethers.ZeroAddress,
            '0x',
          );

        const expectedSelectors = [...selectors];

        for (let selector of [...selectors].sort(() => 0.5 - Math.random())) {
          await instance.connect(proxyAdmin).diamondCut(
            [
              {
                target: ethers.ZeroAddress,
                action: 2,
                selectors: [selector],
              },
            ],
            ethers.ZeroAddress,
            '0x',
          );

          const last = expectedSelectors.pop();

          if (last && last !== selector) {
            expectedSelectors.splice(
              expectedSelectors.indexOf(selector),
              1,
              last,
            );

            // call reverts, but with mock-specific message
            await expect(
              proxyAdmin.sendTransaction({
                to: await instance.getAddress(),
                data: last,
              }),
            ).to.be.revertedWith('Mock on the method is not initialized');
          }

          await expect(
            proxyAdmin.sendTransaction({
              to: await instance.getAddress(),
              data: selector,
            }),
          ).to.be.revertedWithCustomError(
            instance,
            'Proxy__ImplementationIsNotContract',
          );

          expect(
            Array.from(await instance.facets.staticCall()),
          ).to.have.deep.members(
            [
              ...args.facetCuts.map((fc) => [fc.target, fc.selectors]),
              [facet.address, expectedSelectors],
            ].filter((f) => f[1].length),
          );

          expect(
            Array.from(
              await instance.facetFunctionSelectors.staticCall(facet.address),
            ),
          ).to.have.deep.members(expectedSelectors);

          expect(await instance.facetAddress.staticCall(selector)).to.equal(
            ethers.ZeroAddress,
          );
        }
      });

      describe('removing 0x00000000 does not disrupt selector tracking', () => {
        it('does not revert with missing selector if removal of payable selector @ selectorCount % 8', async () => {
          const payableSelector = '0x00000000';

          const existingSelectors = await instance.facets();

          const selectorCount = existingSelectors.reduce((acc, x) => {
            return acc + x.selectors.length;
          }, 0);

          const numberOfSelectorsToAdd = selectorCount % 8;

          const selectors = [];
          for (let i = 0; i < numberOfSelectorsToAdd; i++) {
            selectors.push(ethers.hexlify(ethers.randomBytes(4)));
          }

          selectors.push(payableSelector);

          await instance.diamondCut(
            [
              {
                action: 0,
                selectors: selectors,
                target: facet.address,
              },
            ],
            ethers.ZeroAddress,
            '0x',
          );

          await instance.diamondCut(
            [
              {
                action: 2,
                selectors: [payableSelector],
                target: ethers.ZeroAddress,
              },
            ],
            ethers.ZeroAddress,
            '0x',
          );

          expect(
            await instance.facetFunctionSelectors(facet.address),
            'missing selector',
          ).to.deep.eq(selectors.filter((x) => x != payableSelector));
        });

        // This loop of tests fuzzes the fix, it adds the payable(0x00000000) selector to every selectorSlotIndex, removes it and checks all other selectors a unaffected
        for (
          let numberOfSelectorsToAdd = 0;
          numberOfSelectorsToAdd < 10;
          numberOfSelectorsToAdd++
        ) {
          it('does not revert with missing selector if removal of payable selector @ selectorCount % 8', async () => {
            const payableSelector = '0x00000000';

            const selectors = [];
            for (let i = 0; i < numberOfSelectorsToAdd; i++) {
              selectors.push(ethers.hexlify(ethers.randomBytes(4)));
            }

            selectors.push(payableSelector);

            await instance.diamondCut(
              [
                {
                  action: 0,
                  selectors: selectors,
                  target: facet.address,
                },
              ],
              ethers.ZeroAddress,
              '0x',
            );

            await instance.diamondCut(
              [
                {
                  action: 2,
                  selectors: [payableSelector],
                  target: ethers.ZeroAddress,
                },
              ],
              ethers.ZeroAddress,
              '0x',
            );

            expect(
              await instance.facetFunctionSelectors(facet.address),
              'missing selector',
            ).to.deep.eq(selectors.filter((x) => x != payableSelector));
          });
        }
      });
    });
  });
}
