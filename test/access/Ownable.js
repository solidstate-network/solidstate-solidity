const describeBehaviorOfOwnable = require('./Ownable.behavior.js');

let getOwner = async function () {
  let [signer] = await ethers.getSigners();
  return signer;
};

let deploy = async function () {
  let factory = await ethers.getContractFactory('OwnableMock');
  let instance = await factory.deploy((await getOwner()).address);
  return await instance.deployed();
};

describe('Ownable', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfOwnable({ deploy, getOwner });
});
