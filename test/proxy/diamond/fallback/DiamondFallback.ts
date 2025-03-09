import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfDiamondFallback } from '@solidstate/spec';
import {
  __hh_exposed_DiamondFallback,
  __hh_exposed_DiamondFallback__factory,
  __hh_exposed_SafeOwnable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondFallback', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: __hh_exposed_DiamondFallback;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    const facetInstance = await new __hh_exposed_SafeOwnable__factory(
      deployer,
    ).deploy();

    await instance.__hh_exposed__setOwner(await deployer.getAddress());

    instance = await new __hh_exposed_DiamondFallback__factory(
      deployer,
    ).deploy();

    await instance.__hh_exposed__setOwner(await deployer.getAddress());

    // await instance.__hh_exposed__diamondCut(
    //   [
    //     {
    //       target: await facetInstance.getAddress(),
    //       action: 0,
    //       selectors: [
    //         facetInstance.interface.getFunction('nomineeOwner').selector,
    //       ],
    //     },
    //   ],
    //   ethers.ZeroAddress,
    //   '0x',
    // );
  });

  describeBehaviorOfDiamondFallback(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    implementationFunction: 'nomineeOwner()',
    implementationFunctionArgs: [],
    fallbackAddress: ethers.ZeroAddress,
  });
});
