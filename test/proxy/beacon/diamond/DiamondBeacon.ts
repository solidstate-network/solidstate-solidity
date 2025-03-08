import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondBeacon } from '@solidstate/spec';
import {
  __hh_exposed_DiamondBeacon,
  __hh_exposed_DiamondBeacon__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('DiamondBeacon', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: __hh_exposed_DiamondBeacon;
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

    instance = await new __hh_exposed_DiamondBeacon__factory(deployer).deploy();

    await instance.__hh_exposed__setOwner(await owner.getAddress());

    await instance.__hh_exposed__diamondCut(
      facetCuts,
      ethers.ZeroAddress,
      '0x',
    );
  });

  describeBehaviorOfDiamondBeacon(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    facetCuts,
    immutableSelectors: [],
  });
});
