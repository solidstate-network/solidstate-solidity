import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfSolidStateDiamond } from '@solidstate/spec';
import {
  SolidStateDiamond,
  SolidStateDiamondMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('SolidStateDiamond', () => {
  let owner: SignerWithAddress;
  let nomineeOwner: SignerWithAddress;
  let nonOwner: SignerWithAddress;

  let instance: SolidStateDiamond;

  let facetCuts: any[] = [];
  let immutableSelectors: string[] = [];

  before(async () => {
    [owner, nomineeOwner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new SolidStateDiamondMock__factory(deployer).deploy();

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

  describeBehaviorOfSolidStateDiamond(
    async () => instance,
    {
      getOwner: async () => owner,
      getNomineeOwner: async () => nomineeOwner,
      getNonOwner: async () => nonOwner,
      facetFunction: '',
      facetFunctionArgs: [],
      facetCuts,
      fallbackAddress: ethers.ZeroAddress,
      immutableSelectors,
    },
    ['fallback()'],
  );
});
