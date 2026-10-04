import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondBeacon } from '@solidstate/spec';
import {
  type $DiamondBeacon,
  $DiamondBeacon__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'ethers';
import { network } from 'hardhat';

const connection = await network.create();

describe('DiamondBeacon', () => {
  let owner: HardhatEthersSigner;
  let nonOwner: HardhatEthersSigner;
  let instance: $DiamondBeacon;
  const facetCuts: any[] = [];

  before(async () => {
    [owner, nonOwner] = await connection.ethers.getSigners();

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
    const [deployer] = await connection.ethers.getSigners();

    instance = await new $DiamondBeacon__factory(deployer).deploy();

    await instance.$_setOwner(await owner.getAddress());

    await instance.$_diamondCut(facetCuts, ethers.ZeroAddress, '0x');
  });

  describeBehaviorOfDiamondBeacon(connection, async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    getProxyAdmin: async () => owner,
    getNonProxyAdmin: async () => nonOwner,
    // facetCuts,
    immutableSelectors: [],
  });
});
