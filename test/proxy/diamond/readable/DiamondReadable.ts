import { describeBehaviorOfDiamondReadable } from '@solidstate/spec';
import {
  DiamondReadableMock,
  DiamondReadableMock__factory,
} from '@solidstate/typechain-types';
import { deployMockContract } from 'ethereum-waffle';
import { ethers } from 'hardhat';

describe('DiamondReadable', function () {
  let facet;
  const facetCuts: any[] = [];

  let instance: DiamondReadableMock;

  before(async function () {
    const functions = [];
    const selectors = [];

    for (let i = 0; i < 24; i++) {
      const fn = `fn${i}()`;
      functions.push(fn);
      selectors.push(
        ethers.utils.hexDataSlice(
          ethers.utils.solidityKeccak256(['string'], [fn]),
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

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new DiamondReadableMock__factory(deployer).deploy(
      facetCuts,
    );
  });

  describeBehaviorOfDiamondReadable({
    deploy: async () => instance as any,
    facetCuts,
  });
});
