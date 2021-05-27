import { ethers } from 'hardhat';
import { deployMockContract } from 'ethereum-waffle';
import { describeBehaviorOfDiamondLoupe } from '@solidstate/spec/proxy/diamond/DiamondLoupe.behavior';
import {
  DiamondLoupeMock,
  DiamondLoupeMock__factory,
} from '@solidstate/typechain';

describe('DiamondLoupe', function () {
  let facet;
  const facetCuts: any[] = [];

  let instance: DiamondLoupeMock;

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
    instance = await new DiamondLoupeMock__factory(deployer).deploy(facetCuts);
  });

  describeBehaviorOfDiamondLoupe(
    {
      deploy: async () => instance,
      facetCuts,
    },
    [],
  );
});
