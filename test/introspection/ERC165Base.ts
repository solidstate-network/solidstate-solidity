import { describeBehaviorOfERC165Base } from '@solidstate/spec';
import {
  ERC165BaseMock,
  ERC165BaseMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC165Base', function () {
  let instance: ERC165BaseMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC165BaseMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC165Base(async () => instance, {
    interfaceIds: [],
  });
});
