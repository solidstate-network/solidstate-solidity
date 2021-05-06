const { deployMockContract } = require('@ethereum-waffle/mock-contract');

const describeBehaviorOfDiamondLoupe = require('@solidstate/spec/proxy/diamond/DiamondLoupe.behavior.js');

describe('DiamondLoupe', function () {
  let facet;
  const facetCuts = [];

  const deploy = async function () {
    const factory = await ethers.getContractFactory('DiamondLoupeMock');
    const instance = await factory.deploy(facetCuts);
    return await instance.deployed();
  };

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  before(async function () {
    const functions = [];
    const selectors = [];

    for (let i = 0; i < 24; i++) {
      const fn = `fn${ i }()`;
      functions.push(fn);
      selectors.push(ethers.utils.hexDataSlice(
        ethers.utils.solidityKeccak256(['string'], [fn]), 0, 4
      ));
    }

    const abi = functions.map(fn => `function ${ fn }`);

    const [owner] = await ethers.getSigners();
    facet = await deployMockContract(owner, abi);

    facetCuts.push({
      target: facet.address,
      action: 0,
      selectors,
    });
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfDiamondLoupe({
    deploy,
    facetCuts,
  });
});
