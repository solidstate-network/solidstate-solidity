const { expect } = require('chai');

const describeBehaviorOfDiamond = require('@solidstate/spec/proxy/diamond/Diamond.behavior.js');

const deploy = async function () {
  const factory = await ethers.getContractFactory('Diamond');
  const instance = await factory.deploy();
  return await instance.deployed();
};

describe('Diamond', function () {
  let owner, getNomineeOwner, getNonOwner;

  let instance;

  let facetCuts = [];

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
      deploy: () => instance,
      getOwner: () => owner,
      getNomineeOwner: () => getNomineeOwner,
      getNonOwner: () => getNonOwner,
      facetCuts,
      fallbackAddress: ethers.constants.AddressZero,
    },
    [],
  );
});
