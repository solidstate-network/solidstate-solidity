import { describeBehaviorOfMetamorphicFactory } from '@solidstate/spec';
import {
  MetamorphicFactoryMock,
  MetamorphicFactoryMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MetamorphicFactory', () => {
  let instance: MetamorphicFactoryMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new MetamorphicFactoryMock__factory(deployer).deploy();
  });

  describeBehaviorOfMetamorphicFactory(async () => instance, {});

  describe('__internal', () => {
    describe('#_deployMetamorphicContract(address,bytes32)', () => {
      it('deploys metamorphic contract and returns deployment address', async () => {
        const target = await instance.getAddress();
        const salt = ethers.randomBytes(32);

        const address = await instance.__deployMetamorphicContract.staticCall(
          target,
          salt,
        );

        expect(address).to.be.properAddress;

        await instance.__deployMetamorphicContract(target, salt);

        expect(await ethers.provider.getCode(address)).to.equal(
          await ethers.provider.getCode(target),
        );
      });

      describe('reverts if', () => {
        it('salt has already been used', async () => {
          const target = await instance.getAddress();
          const salt = ethers.randomBytes(32);

          await instance.__deployMetamorphicContract(target, salt);

          await expect(
            instance.__deployMetamorphicContract(target, salt),
          ).to.be.revertedWithCustomError(
            instance,
            'Factory__FailedDeployment',
          );
        });
      });
    });

    describe('#_calculateMetamorphicDeploymentAddress(bytes32)', () => {
      it('returns address of not-yet-deployed contract', async () => {
        const initCode =
          '0x5860208158601c335a639c2236038752fa158151803b80938091923cf3';
        const initCodeHash = ethers.keccak256(initCode);
        const salt = ethers.randomBytes(32);

        expect(
          await instance.__calculateMetamorphicDeploymentAddress.staticCall(
            salt,
          ),
        ).to.equal(
          ethers.getCreate2Address(
            await instance.getAddress(),
            salt,
            initCodeHash,
          ),
        );
      });
    });
  });
});
