import { describeBehaviorOfERC165Base } from '@solidstate/spec';
import {
  __hh_exposed_ERC165Base,
  __hh_exposed_ERC165Base__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC165Base', () => {
  let instance: __hh_exposed_ERC165Base;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_ERC165Base__factory(deployer).deploy();

    await instance.__hh_exposed__setSupportsInterface('0x01ffc9a7', true);
  });

  describeBehaviorOfERC165Base(async () => instance, {
    interfaceIds: [],
  });

  describe('__internal', () => {
    describe('#_supportsInterface(bytes4)', () => {
      it('returns whether interface ID is supported', async () => {
        const interfaceId = ethers.randomBytes(4);

        expect(
          await instance.__hh_exposed__supportsInterface.staticCall(
            interfaceId,
          ),
        ).to.be.false;

        await instance.__hh_exposed__setSupportsInterface(interfaceId, true);

        expect(
          await instance.__hh_exposed__supportsInterface.staticCall(
            interfaceId,
          ),
        ).to.be.true;
      });
    });

    describe('#_setSupportsInterface(bytes4,bool)', () => {
      it('updates support status for given interface', async () => {
        const interfaceId = ethers.randomBytes(4);

        await instance.__hh_exposed__setSupportsInterface(interfaceId, true);

        expect(
          await instance.__hh_exposed__supportsInterface.staticCall(
            interfaceId,
          ),
        ).to.be.true;

        await instance.__hh_exposed__setSupportsInterface(interfaceId, false);

        expect(
          await instance.__hh_exposed__supportsInterface.staticCall(
            interfaceId,
          ),
        ).to.be.false;
      });

      describe('reverts if', () => {
        it('specified interface ID is 0xffffffff', async () => {
          await expect(
            instance.__hh_exposed__setSupportsInterface('0xffffffff', true),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC165Base__InvalidInterfaceId',
          );
        });
      });
    });
  });
});
