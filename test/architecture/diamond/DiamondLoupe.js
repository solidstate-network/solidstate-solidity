const { describeBehaviorOfDiamondLoupe } = require('./DiamondLoupe.behavior.js');

describe('DiamondLoupe', function () {
  let facetInstance;
  let facetCuts = [];

  let deploy = async function () {
    let factory = await ethers.getContractFactory('DiamondLoupeMock');
    let instance = await factory.deploy(facetCuts);
    return await instance.deployed();
  };

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  before(async function () {
    let [signer] = await ethers.getSigners();

    let facetFactory = await ethers.getContractFactory('OwnableMock');
    facetInstance = await facetFactory.deploy(signer.address);
    await facetInstance.deployed();

    facetCuts.push(
      [
        facetInstance.address,
        facetInstance.interface.getSighash('owner()'),
      ]
    );

    facetCuts.push(
      [
        facetInstance.address,
        facetInstance.interface.getSighash('transferOwnership(address)'),
      ]
    );
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfDiamondLoupe({
    deploy,
    facetCuts,
  });
});
