import { describeBehaviorOfSafeOwnable } from '../../access';
import { describeBehaviorOfERC165 } from '../../introspection';
import { describeBehaviorOfDiamondBase } from './base/DiamondBase.behavior';
import { describeBehaviorOfDiamondReadable } from './readable/DiamondReadable.behavior';
import { describeBehaviorOfDiamondWritable } from './writable/DiamondWritable.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { ISolidStateDiamond } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { deployMockContract, MockContract } from 'ethereum-waffle';
import { ethers } from 'hardhat';

export interface SolidStateDiamondBehaviorArgs {
  deploy: () => Promise<ISolidStateDiamond>;
  getOwner: () => Promise<SignerWithAddress>;
  getNomineeOwner: () => Promise<SignerWithAddress>;
  getNonOwner: () => Promise<SignerWithAddress>;
  facetFunction: string;
  facetFunctionArgs: string[];
  facetCuts: any[];
  fallbackAddress: string;
}

export function describeBehaviorOfSolidStateDiamond(
  {
    deploy,
    getOwner,
    getNomineeOwner,
    getNonOwner,
    facetFunction,
    facetFunctionArgs,
    facetCuts,
    fallbackAddress,
  }: SolidStateDiamondBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidStateDiamond', function () {
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    let instance: ISolidStateDiamond;

    before(async function () {
      owner = await getOwner();
      nonOwner = await getNonOwner();
    });

    beforeEach(async function () {
      instance = await deploy();
    });

    describeBehaviorOfDiamondBase(
      {
        deploy,
        facetFunction,
        facetFunctionArgs,
      },
      skips,
    );

    describeBehaviorOfDiamondReadable(
      {
        deploy,
        facetCuts,
      },
      skips,
    );

    describeBehaviorOfDiamondWritable(
      {
        deploy,
        getOwner,
        getNonOwner,
      },
      skips,
    );

    describeBehaviorOfERC165(
      {
        deploy,
        interfaceIds: ['0x7f5828d0'],
      },
      skips,
    );

    describeBehaviorOfSafeOwnable(
      {
        deploy,
        getOwner,
        getNomineeOwner,
        getNonOwner,
      },
      skips,
    );

    describe('receive()', function () {
      it('accepts ether transfer', async function () {
        let [signer] = await ethers.getSigners();
        let value = ethers.constants.One;

        await expect(() =>
          signer.sendTransaction({ to: instance.address, value }),
        ).to.changeEtherBalance(instance, value);
      });
    });

    describe('#getFallbackAddress()', function () {
      it('returns the fallback address', async function () {
        expect(await instance.callStatic['getFallbackAddress()']()).to.equal(
          fallbackAddress,
        );
      });
    });

    describe('#setFallbackAddress(address)', function () {
      it('updates the fallback address', async function () {
        const fallback = await deployMockContract(owner, []);

        await instance
          .connect(owner)
          ['setFallbackAddress(address)'](fallback.address);

        expect(await instance.callStatic['getFallbackAddress()']()).to.equal(
          fallback.address,
        );

        // call reverts, but with mock-specific message
        await expect(
          owner.call({
            to: instance.address,
            data: ethers.utils.randomBytes(4),
          }),
        ).to.be.revertedWith('Mock on the method is not initialized');
      });

      describe('reverts if', function () {
        it('sender is not owner', async function () {
          await expect(
            instance
              .connect(nonOwner)
              ['setFallbackAddress(address)'](ethers.constants.AddressZero),
          ).to.be.revertedWith('Ownable: sender must be owner');
        });
      });
    });

    describe('#diamondCut((address,enum,bytes4[])[],address,bytes)', function () {
      const selectors: string[] = [];
      const abi: string[] = [];
      let facet: MockContract;

      before(async function () {
        for (let i = 0; i < 24; i++) {
          const fn = `fn${i}()`;
          abi.push(`function ${fn}`);
          selectors.push(
            ethers.utils.hexDataSlice(
              ethers.utils.solidityKeccak256(['string'], [fn]),
              0,
              4,
            ),
          );
        }

        facet = await deployMockContract(owner, abi);
      });

      it('adds selectors one-by-one', async function () {
        const expectedSelectors = [];

        for (let selector of selectors) {
          await instance
            .connect(owner)
            .diamondCut(
              [{ target: facet.address, action: 0, selectors: [selector] }],
              ethers.constants.AddressZero,
              '0x',
            );

          expectedSelectors.push(selector);

          // call reverts, but with mock-specific message
          await expect(
            owner.call({ to: instance.address, data: selector }),
          ).to.be.revertedWith('Mock on the method is not initialized');

          expect(await instance.callStatic['facets()']()).to.have.deep.members([
            ...facetCuts.map((fc) => [fc.target, fc.selectors]),
            [facet.address, expectedSelectors],
          ]);

          expect(
            await instance.callStatic['facetFunctionSelectors(address)'](
              facet.address,
            ),
          ).to.have.deep.members(expectedSelectors);

          expect(
            await instance.callStatic['facetAddress(bytes4)'](selector),
          ).to.equal(facet.address);
        }
      });

      it('removes selectors one-by-one in ascending order of addition', async function () {
        await instance
          .connect(owner)
          .diamondCut(
            [{ target: facet.address, action: 0, selectors }],
            ethers.constants.AddressZero,
            '0x',
          );

        const expectedSelectors = [...selectors];

        for (let selector of selectors) {
          await instance.connect(owner).diamondCut(
            [
              {
                target: ethers.constants.AddressZero,
                action: 2,
                selectors: [selector],
              },
            ],
            ethers.constants.AddressZero,
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
              owner.call({ to: instance.address, data: last }),
            ).to.be.revertedWith('Mock on the method is not initialized');
          }

          await expect(
            owner.call({ to: instance.address, data: selector }),
          ).to.be.revertedWith(
            'DiamondBase: no facet found for function signature',
          );

          expect(await instance.callStatic['facets()']()).to.have.deep.members(
            [
              ...facetCuts.map((fc) => [fc.target, fc.selectors]),
              [facet.address, expectedSelectors],
            ].filter((f) => f[1].length),
          );

          expect(
            await instance.callStatic['facetFunctionSelectors(address)'](
              facet.address,
            ),
          ).to.have.deep.members(expectedSelectors);

          expect(
            await instance.callStatic['facetAddress(bytes4)'](selector),
          ).to.equal(ethers.constants.AddressZero);
        }
      });

      it('removes selectors one-by-one in descending order of addition', async function () {
        await instance
          .connect(owner)
          .diamondCut(
            [{ target: facet.address, action: 0, selectors }],
            ethers.constants.AddressZero,
            '0x',
          );

        const expectedSelectors = [...selectors];

        for (let selector of [...selectors].reverse()) {
          await instance.connect(owner).diamondCut(
            [
              {
                target: ethers.constants.AddressZero,
                action: 2,
                selectors: [selector],
              },
            ],
            ethers.constants.AddressZero,
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
              owner.call({ to: instance.address, data: last }),
            ).to.be.revertedWith('Mock on the method is not initialized');
          }

          await expect(
            owner.call({ to: instance.address, data: selector }),
          ).to.be.revertedWith(
            'DiamondBase: no facet found for function signature',
          );

          expect(await instance.callStatic['facets()']()).to.have.deep.members(
            [
              ...facetCuts.map((fc) => [fc.target, fc.selectors]),
              [facet.address, expectedSelectors],
            ].filter((f) => f[1].length),
          );

          expect(
            await instance.callStatic['facetFunctionSelectors(address)'](
              facet.address,
            ),
          ).to.have.deep.members(expectedSelectors);

          expect(
            await instance.callStatic['facetAddress(bytes4)'](selector),
          ).to.equal(ethers.constants.AddressZero);
        }
      });

      it('removes selectors one-by-one in random order', async function () {
        await instance
          .connect(owner)
          .diamondCut(
            [{ target: facet.address, action: 0, selectors }],
            ethers.constants.AddressZero,
            '0x',
          );

        const expectedSelectors = [...selectors];

        for (let selector of [...selectors].sort(() => 0.5 - Math.random())) {
          await instance.connect(owner).diamondCut(
            [
              {
                target: ethers.constants.AddressZero,
                action: 2,
                selectors: [selector],
              },
            ],
            ethers.constants.AddressZero,
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
              owner.call({ to: instance.address, data: last }),
            ).to.be.revertedWith('Mock on the method is not initialized');
          }

          await expect(
            owner.call({ to: instance.address, data: selector }),
          ).to.be.revertedWith(
            'DiamondBase: no facet found for function signature',
          );

          expect(await instance.callStatic['facets()']()).to.have.deep.members(
            [
              ...facetCuts.map((fc) => [fc.target, fc.selectors]),
              [facet.address, expectedSelectors],
            ].filter((f) => f[1].length),
          );

          expect(
            await instance.callStatic['facetFunctionSelectors(address)'](
              facet.address,
            ),
          ).to.have.deep.members(expectedSelectors);

          expect(
            await instance.callStatic['facetAddress(bytes4)'](selector),
          ).to.equal(ethers.constants.AddressZero);
        }
      });
    });
  });
}
