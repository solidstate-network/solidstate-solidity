import { describeBehaviorOfERC165 } from '../../spec/introspection/ERC165.behavior';
import { ERC165Mock__factory } from '../../typechain';
import { ethers } from 'hardhat';

let deploy = async function () {
  const [deployer] = await ethers.getSigners();
  return await new ERC165Mock__factory(deployer).deploy();
};

describe('ERC165', function () {
  describeBehaviorOfERC165(
    {
      deploy,
      interfaceIds: [],
    },
    [],
  );
});
