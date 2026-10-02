import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondProxyReadable } from '@solidstate/spec';
import {
  $DiamondProxyReadable,
  $DiamondProxyReadable__factory,
  $ERC2535Storage__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('DiamondProxyReadable', () => {
  let facet;
  const facetCuts: any[] = [];

  let instance: $DiamondProxyReadable;

  before(async () => {
    const functions = [];
    const selectors = [];

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

    const abi = functions.map((fn) => `function ${fn}`);

    const [owner] = await ethers.getSigners();
    facet = await deployMockContract(owner, abi);

    facetCuts.push({
      target: facet.address,
      action: 0,
      selectors,
    });
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $DiamondProxyReadable__factory(deployer).deploy();

    await instance.$_setSupportsInterface('0x01ffc9a7', true);
    await instance.$_setSupportsInterface('0x48e2b093', true);

    await instance.$_diamondCut(facetCuts, ethers.ZeroAddress, '0x');
  });

  describeBehaviorOfDiamondProxyReadable(async () => instance, {
    facetCuts,
  });

  describe('#_diamondCut((address,enum,bytes4[])[],address,bytes)', () => {
    it('tracks more than 65535 selectors', async function () {
      this.timeout(0);

      const [deployer] = await ethers.getSigners();
      const largeFacet = await deployMockContract(deployer, []);

      const storageSlot = BigInt(
        await (
          await new $ERC2535Storage__factory(deployer).deploy()
        ).$DEFAULT_STORAGE_SLOT.staticCall(),
      );
      const selectorCountSlot = storageSlot + 1n;
      const selectorSlugsSlot = storageSlot + 2n;

      const getSelectorCount = async () =>
        BigInt(await ethers.provider.getStorage(instance, selectorCountSlot));

      const getSelectorSlug = async (index: bigint) =>
        ethers.provider.getStorage(
          instance,
          ethers.solidityPackedKeccak256(
            ['uint256', 'uint256'],
            [index, selectorSlugsSlot],
          ),
        );

      const existingSelectorCount = BigInt(
        facetCuts.reduce((sum, fc) => sum + fc.selectors.length, 0),
      );

      // fill the diamond to exactly 65536 selectors, so that the next selector added is at index 65536
      const newSelectorCount = 65536 - Number(existingSelectorCount);
      // keep each cut within the transaction gas limit
      const chunkSize = 500;

      for (let i = 0; i < newSelectorCount; i += chunkSize) {
        const selectors = [];

        for (let j = i; j < Math.min(i + chunkSize, newSelectorCount); j++) {
          selectors.push(ethers.toBeHex(0x10000000 + j, 4));
        }

        await instance.$_diamondCut(
          [{ target: largeFacet.address, action: 0, selectors }],
          ethers.ZeroAddress,
          '0x',
        );
      }

      const firstSlug = await getSelectorSlug(0n);

      // add two selectors at indices 65536 and 65537, both in slug 8192
      const selectorA = '0x20000000';
      const selectorB = '0x20000001';

      await instance.$_diamondCut(
        [
          {
            target: largeFacet.address,
            action: 0,
            selectors: [selectorA, selectorB],
          },
        ],
        ethers.ZeroAddress,
        '0x',
      );

      expect(await getSelectorCount()).to.eq(65538n);

      // remove selectorA, so that selectorB is moved from index 65537 to index 65536
      await instance.$_diamondCut(
        [{ target: ethers.ZeroAddress, action: 2, selectors: [selectorA] }],
        ethers.ZeroAddress,
        '0x',
      );

      expect(await getSelectorCount()).to.eq(65537n);
      expect(await instance.facetAddress.staticCall(selectorA)).to.eq(
        ethers.ZeroAddress,
      );
      expect(await instance.facetAddress.staticCall(selectorB)).to.eq(
        largeFacet.address,
      );
      expect(ethers.dataSlice(await getSelectorSlug(8192n), 0, 4)).to.eq(
        selectorB,
      );
      expect(await getSelectorSlug(0n)).to.eq(firstSlug);
    });
  });
});
