const describeBehaviorOfSafeOwnable = require('@solidstate/spec/access/SafeOwnable.behavior.js');

let getOwner = async function () {
  let [signer] = await ethers.getSigners();
  return signer;
};

let getNomineeOwner = async function () {
  let [, signer] = await ethers.getSigners();
  return signer;
};

let getNonOwner = async function () {
  let [, , signer] = await ethers.getSigners();
  return signer;
};

let deploy = async function () {
  let factory = await ethers.getContractFactory('SafeOwnableMock');
  let instance = await factory.deploy((await getOwner()).address);
  return await instance.deployed();
};

describe('SafeOwnable', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfSafeOwnable({
    deploy,
    getOwner,
    getNomineeOwner,
    getNonOwner,
  }, []);
});
