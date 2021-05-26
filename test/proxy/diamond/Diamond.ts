import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Diamond, Diamond__factory } from '../../../typechain';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfDiamond } from '../../../spec/proxy/diamond/Diamond.behavior';

const deploy = async function () {
  const [deployer] = await ethers.getSigners();
  return new Diamond__factory(deployer).deploy();
};

describe('Diamond', function () {
  let owner: SignerWithAddress;
  let getNomineeOwner: SignerWithAddress;
  let getNonOwner: SignerWithAddress;

  let instance: Diamond;

  let facetCuts: any[] = [];

  before(async function () {
    [owner, getNomineeOwner, getNonOwner] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await deploy();

    const facets = await instance.callStatic.facets();

    expect(facets).to.have.lengthOf(1);

    facetCuts[0] = {
      target: instance.address,
      action: 0,
      selectors: facets[0].selectors,
    };
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfDiamond(
    {
      deploy: async () => instance,
      getOwner: async () => owner,
      getNomineeOwner: async () => getNomineeOwner,
      getNonOwner: async () => getNonOwner,
      facetCuts,
      fallbackAddress: ethers.constants.AddressZero,
    },
    [],
  );
});
