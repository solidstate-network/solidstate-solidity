import {
  OwnableBehaviorArgs,
  describeBehaviorOfIntrospectable,
} from '../../../';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeFilter } from '@solidstate/library';
import {
  IDiamondProxyWritable,
  IDiamondProxyReadable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface DiamondProxyWritableBehaviorArgs extends OwnableBehaviorArgs {
  immutableSelectors: string[];
}

export function describeBehaviorOfDiamondProxyWritable(
  deploy: () => Promise<IDiamondProxyWritable>,
  args: DiamondProxyWritableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondProxyWritable', () => {
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    const functions: string[] = [];
    const selectors: string[] = [];
    let abi: any;
    let facet: any;

    let instance: IDiamondProxyWritable;

    before(async () => {
      owner = await args.getOwner();
      nonOwner = await args.getNonOwner();

      for (let i = 0; i < 24; i++) {
        const fn = `fn${i}()`;
        functions.push(fn);
        selectors.push(
          ethers.dataSlice(
            ethers.solidityPackedKeccak256(['string'], [fn]),
            0,
            4,
          ),
        );
      }

      // include a function known to have a zero-bytes selector
      functions.push('ROOT4146650865()');
      selectors.push('0x00000000');

      abi = functions.map((fn) => `function ${fn}`);

      facet = await deployMockContract(owner, abi);
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    // TODO: nonstandard usage
    describeBehaviorOfIntrospectable(
      deploy as any,
      {
        interfaceIds: ['0x1f931c1c'],
      },
      skips,
    );

    describe('#diamondCut((address,enum,bytes4[])[],address,bytes)', () => {
      it('emits DiamondCut event', async () => {
        const facets = [
          {
            target: facet.address,
            action: 0n,
            selectors: [ethers.hexlify(ethers.randomBytes(4))],
          },
        ];
        const target = ethers.ZeroAddress;
        const data = '0x';

        await expect(instance.connect(owner).diamondCut(facets, target, data))
          .to.emit(instance, 'DiamondCut')
          .withArgs(
            facets.map((f) => [f.target, f.action, f.selectors]),
            target,
            data,
          );
      });

      describe('using FacetCutAction ADD', () => {
        it.skip('adds facet', async () => {
          const contract = new ethers.Contract(
            await instance.getAddress(),
            abi,
            ethers.provider,
          );

          for (let fn of functions) {
            await expect(
              contract[fn].staticCall(),
            ).to.be.revertedWithCustomError(
              instance,
              'AddressUtils__NotContract',
            );
          }

          await instance
            .connect(owner)
            .diamondCut(
              [{ target: facet.address, action: 0, selectors }],
              ethers.ZeroAddress,
              '0x',
            );

          for (let fn of functions) {
            // call reverts, but with mock-specific message
            await expect(contract[fn].staticCall()).to.be.revertedWith(
              'Mock on the method is not initialized',
            );
          }
        });

        describe('reverts if', () => {
          it('target facet is not a contract', async () => {
            await expect(
              instance.connect(owner).diamondCut(
                [
                  {
                    target: ethers.ZeroAddress,
                    action: 0,
                    selectors: [ethers.randomBytes(4)],
                  },
                ],
                ethers.ZeroAddress,
                '0x',
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DiamondProxyWritable__TargetHasNoCode',
            );
          });

          it('target facet is diamond itself', async () => {
            await expect(
              instance.connect(owner).diamondCut(
                [
                  {
                    target: await instance.getAddress(),
                    action: 0,
                    selectors: [ethers.randomBytes(4)],
                  },
                ],
                ethers.ZeroAddress,
                '0x',
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DiamondProxyWritable__SelectorIsImmutable',
            );
          });

          it('selector has already been added', async () => {
            const facetCuts = [
              {
                target: facet.address,
                action: 0,
                selectors: [ethers.randomBytes(4)],
              },
            ];

            await instance
              .connect(owner)
              .diamondCut(facetCuts, ethers.ZeroAddress, '0x');

            await expect(
              instance
                .connect(owner)
                .diamondCut(facetCuts, ethers.ZeroAddress, '0x'),
            ).to.be.revertedWithCustomError(
              instance,
              'DiamondProxyWritable__SelectorAlreadyAdded',
            );
          });
        });
      });

      describe('using FacetCutAction REPLACE', () => {
        it.skip('replaces facet', async () => {
          const contract = new ethers.Contract(
            await instance.getAddress(),
            abi,
            ethers.provider,
          );

          await instance
            .connect(owner)
            .diamondCut(
              [{ target: facet.address, action: 0, selectors }],
              ethers.ZeroAddress,
              '0x',
            );

          for (let fn of functions) {
            // call reverts, but with mock-specific message
            await expect(contract[fn].staticCall()).to.be.revertedWith(
              'Mock on the method is not initialized',
            );
          }

          const facetReplacement = await deployMockContract(owner, abi);

          for (let fn of functions) {
            expect(facetReplacement[fn]).not.to.be.undefined;
          }

          await instance
            .connect(owner)
            .diamondCut(
              [{ target: facetReplacement.address, action: 1, selectors }],
              ethers.ZeroAddress,
              '0x',
            );

          for (let fn of functions) {
            // call reverts, but with mock-specific message
            await expect(contract[fn].staticCall()).to.be.revertedWith(
              'Mock on the method is not initialized',
            );
          }
        });

        describe('reverts if', () => {
          it('target facet is not a contract', async () => {
            await expect(
              instance.connect(owner).diamondCut(
                [
                  {
                    target: ethers.ZeroAddress,
                    action: 1,
                    selectors: [ethers.randomBytes(4)],
                  },
                ],
                ethers.ZeroAddress,
                '0x',
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DiamondProxyWritable__TargetHasNoCode',
            );
          });

          it('selector has not been added', async () => {
            await expect(
              instance.connect(owner).diamondCut(
                [
                  {
                    target: facet.address,
                    action: 1,
                    selectors: [ethers.randomBytes(4)],
                  },
                ],
                ethers.ZeroAddress,
                '0x',
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DiamondProxyWritable__SelectorNotFound',
            );
          });

          it('selector is immutable', async () => {
            for (const immutableSelector of args.immutableSelectors) {
              await expect(
                instance.connect(owner).diamondCut(
                  [
                    {
                      target: facet.address,
                      action: 1,
                      selectors: [immutableSelector],
                    },
                  ],
                  ethers.ZeroAddress,
                  '0x',
                ),
              ).to.be.revertedWithCustomError(
                instance,
                'DiamondProxyWritable__SelectorIsImmutable',
              );
            }
          });

          it('replacement facet is same as existing facet', async () => {
            const selector = ethers.randomBytes(4);

            await instance.connect(owner).diamondCut(
              [
                {
                  target: facet.address,
                  action: 0,
                  selectors: [selector],
                },
              ],
              ethers.ZeroAddress,
              '0x',
            );

            await expect(
              instance.connect(owner).diamondCut(
                [
                  {
                    target: facet.address,
                    action: 1,
                    selectors: [selector],
                  },
                ],
                ethers.ZeroAddress,
                '0x',
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DiamondProxyWritable__ReplaceTargetIsIdentical',
            );
          });
        });
      });

      describe('using FacetCutAction REMOVE', () => {
        it.skip('removes facet', async () => {
          const contract = new ethers.Contract(
            await instance.getAddress(),
            abi,
            ethers.provider,
          );

          await instance
            .connect(owner)
            .diamondCut(
              [{ target: facet.address, action: 0, selectors }],
              ethers.ZeroAddress,
              '0x',
            );

          for (let fn of functions) {
            // call reverts, but with mock-specific message
            await expect(contract[fn].staticCall()).to.be.revertedWith(
              'Mock on the method is not initialized',
            );
          }

          await instance
            .connect(owner)
            .diamondCut(
              [{ target: ethers.ZeroAddress, action: 2, selectors }],
              ethers.ZeroAddress,
              '0x',
            );

          for (let fn of functions) {
            await expect(
              contract[fn].staticCall(),
            ).to.be.revertedWithCustomError(
              instance,
              'AddressUtils__NotContract',
            );
          }
        });

        describe('reverts if', () => {
          it('target address is not zero address', async () => {
            await expect(
              instance.connect(owner).diamondCut(
                [
                  {
                    target: await instance.getAddress(),
                    action: 2,
                    selectors: [ethers.randomBytes(4)],
                  },
                ],
                ethers.ZeroAddress,
                '0x',
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DiamondProxyWritable__RemoveTargetNotZeroAddress',
            );
          });

          it('selector has not been added', async () => {
            await expect(
              instance.connect(owner).diamondCut(
                [
                  {
                    target: ethers.ZeroAddress,
                    action: 2,
                    selectors: [ethers.randomBytes(4)],
                  },
                ],
                ethers.ZeroAddress,
                '0x',
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DiamondProxyWritable__SelectorNotFound',
            );
          });

          it('selector is immutable', async () => {
            for (const immutableSelector of args.immutableSelectors) {
              await expect(
                instance.connect(owner).diamondCut(
                  [
                    {
                      target: ethers.ZeroAddress,
                      action: 2,
                      selectors: [immutableSelector],
                    },
                  ],
                  ethers.ZeroAddress,
                  '0x',
                ),
              ).to.be.revertedWithCustomError(
                instance,
                'DiamondProxyWritable__SelectorIsImmutable',
              );
            }
          });
        });
      });

      describe('reverts if', () => {
        it('sender is not owner', async () => {
          await expect(
            instance.connect(nonOwner).diamondCut([], ethers.ZeroAddress, '0x'),
          ).to.be.revertedWithCustomError(instance, 'Ownable__NotOwner');
        });

        it('passed FacetCutAction is invalid', async () => {
          await expect(
            instance.connect(owner).diamondCut(
              [
                {
                  target: ethers.ZeroAddress,
                  action: 3,
                  selectors: [],
                },
              ],
              ethers.ZeroAddress,
              '0x',
            ),
          ).to.be.revertedWithoutReason();
        });

        it('passed selector array is empty', async () => {
          await expect(
            instance.connect(owner).diamondCut(
              [
                {
                  target: ethers.ZeroAddress,
                  action: 0,
                  selectors: [],
                },
              ],
              ethers.ZeroAddress,
              '0x',
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'DiamondProxyWritable__SelectorNotSpecified',
          );
        });

        it('initialization target is provided but data is not', async () => {
          await expect(
            instance.connect(owner).diamondCut([], facet.address, '0x'),
          ).to.be.revertedWithCustomError(
            instance,
            'DiamondProxyWritable__InvalidInitializationParameters',
          );
        });

        it('initialization data is provided but target is not', async () => {
          await expect(
            instance.connect(owner).diamondCut([], ethers.ZeroAddress, '0x01'),
          ).to.be.revertedWithCustomError(
            instance,
            'DiamondProxyWritable__InvalidInitializationParameters',
          );
        });

        it('initialization target has no code', async () => {
          await expect(
            instance.connect(owner).diamondCut([], owner.address, '0x01'),
          ).to.be.revertedWithCustomError(
            instance,
            'DiamondProxyWritable__TargetHasNoCode',
          );
        });

        it('initialization function reverts', async () => {
          await expect(
            instance.connect(owner).diamondCut([], facet.address, '0x01'),
          ).to.be.revertedWith('Mock on the method is not initialized');
        });
      });
    });
  });
}
