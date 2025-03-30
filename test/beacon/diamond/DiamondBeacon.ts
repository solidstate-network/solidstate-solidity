import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondBeacon } from '@solidstate/spec';
import {
  $DiamondBeacon,
  $DiamondBeacon__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondBeacon', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: $DiamondBeacon;
  const facetCuts: any[] = [];

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();

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

    const facet = await deployMockContract(owner, abi);

    facetCuts.push({
      target: facet.address,
      action: 0,
      selectors,
    });
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    instance = await new $DiamondBeacon__factory(deployer).deploy();

    await instance.$_setOwner(await owner.getAddress());

    await instance.$_diamondCut(facetCuts, ethers.ZeroAddress, '0x');
  });

  describeBehaviorOfDiamondBeacon(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    // facetCuts,
    immutableSelectors: [],
  });
});
