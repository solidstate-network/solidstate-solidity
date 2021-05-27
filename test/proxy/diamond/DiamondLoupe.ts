import { deployMockContract } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import { describeBehaviorOfDiamondLoupe } from '../../../spec/proxy/diamond/DiamondLoupe.behavior';
import { DiamondLoupeMock__factory } from '../../../typechain';

describe('DiamondLoupe', function () {
  let facet;
  const facetCuts: any[] = [];

  const deploy = async function () {
    const [deployer] = await ethers.getSigners();
    return new DiamondLoupeMock__factory(deployer).deploy(facetCuts);
  };

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

  describeBehaviorOfDiamondLoupe(
    {
      deploy,
      facetCuts,
    },
    [],
  );
});
