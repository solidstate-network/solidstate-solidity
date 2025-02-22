import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondReadable } from '@solidstate/spec';
import {
  DiamondReadableMock,
  DiamondReadableMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondReadable', () => {
  let facet;
  const facetCuts: any[] = [];

  let instance: DiamondReadableMock;

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
    instance = await new DiamondReadableMock__factory(deployer).deploy(
      facetCuts,
    );
  });

  describeBehaviorOfDiamondReadable(async () => instance, {
    facetCuts,
  });
});
