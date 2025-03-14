import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondProxyReadable } from '@solidstate/spec';
import {
  $DiamondProxyReadable,
  $DiamondProxyReadable__factory,
} from '@solidstate/typechain-types';
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
});
