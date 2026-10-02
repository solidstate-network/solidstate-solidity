import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondProxyReadable } from '@solidstate/spec';
import {
  $DiamondProxyReadable,
  $DiamondProxyReadable__factory,
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
    it('removes zero selector from start of slug', async () => {
      // regression test for diamond-2 bug where a slug containing only the zero selector was treated as empty
      // see https://github.com/mudgen/diamond-2-hardhat/commit/70bde4dd
      const existingSelectorCount = facetCuts.reduce(
        (sum, fc) => sum + fc.selectors.length,
        0,
      );

      expect(existingSelectorCount % 8).to.eq(0);

      const zeroSelector = '0x00000000';

      await instance.$_diamondCut(
        [
          {
            target: facetCuts[0].target,
            action: 0,
            selectors: [zeroSelector],
          },
        ],
        ethers.ZeroAddress,
        '0x',
      );

      await instance.$_diamondCut(
        [
          {
            target: ethers.ZeroAddress,
            action: 2,
            selectors: [zeroSelector],
          },
        ],
        ethers.ZeroAddress,
        '0x',
      );

      expect(await instance.facetAddress.staticCall(zeroSelector)).to.eq(
        ethers.ZeroAddress,
      );

      expect(
        Array.from(await instance.facets.staticCall()),
      ).to.have.deep.members(facetCuts.map((fc) => [fc.target, fc.selectors]));
    });
  });
});
