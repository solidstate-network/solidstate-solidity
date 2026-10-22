import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeBehaviorOfSolidstateDiamondProxy } from '@solidstate/spec';
import {
  type $SolidstateDiamondProxy,
  $SolidstateDiamondProxy__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import { network } from 'hardhat';

const connection = await network.create();

describe('SolidstateDiamondProxy', () => {
  let proxyAdmin: HardhatEthersSigner;
  let nonProxyAdmin: HardhatEthersSigner;

  let instance: $SolidstateDiamondProxy;

  let facetCuts: any[] = [];
  let immutableSelectors: string[] = [];

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await connection.ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();
    instance = await new $SolidstateDiamondProxy__factory(deployer).deploy();

    const facets = await instance.facets.staticCall();

    expect(facets).to.have.lengthOf(1);

    facetCuts[0] = {
      target: await instance.getAddress(),
      action: 0,
      selectors: facets[0].selectors,
    };

    for (const selector of facetCuts[0].selectors) {
      immutableSelectors.push(selector);
    }

    expect(immutableSelectors.length).to.be.gt(0);
  });

  describeBehaviorOfSolidstateDiamondProxy(
    connection,
    async () => instance,
    {
      getProxyAdmin: async () => proxyAdmin,
      getNonProxyAdmin: async () => nonProxyAdmin,
      implementationFunction: '',
      implementationFunctionArgs: [],
      facetCuts,
      fallbackAddress: ethers.ZeroAddress,
      immutableSelectors,
    },
    ['fallback()', 'receive()'],
  );
});
