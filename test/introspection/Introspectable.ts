import { describeBehaviorOfIntrospectable } from '@solidstate/spec';
import {
  $Introspectable,
  $Introspectable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Introspectable', () => {
  let instance: $Introspectable;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $Introspectable__factory(deployer).deploy();

    await instance.$_setSupportsInterface('0x01ffc9a7', true);
  });

  describeBehaviorOfIntrospectable(async () => instance, {
    interfaceIds: [],
  });

  describe('__internal', () => {
    describe('#_supportsInterface(bytes4)', () => {
      it('returns whether interface ID is supported', async () => {
        const interfaceId = ethers.randomBytes(4);

        expect(await instance.$_supportsInterface.staticCall(interfaceId)).to.be
          .false;

        await instance.$_setSupportsInterface(interfaceId, true);

        expect(await instance.$_supportsInterface.staticCall(interfaceId)).to.be
          .true;
      });
    });

    describe('#_setSupportsInterface(bytes4,bool)', () => {
      it('updates support status for given interface', async () => {
        const interfaceId = ethers.randomBytes(4);

        await instance.$_setSupportsInterface(interfaceId, true);

        expect(await instance.$_supportsInterface.staticCall(interfaceId)).to.be
          .true;

        await instance.$_setSupportsInterface(interfaceId, false);

        expect(await instance.$_supportsInterface.staticCall(interfaceId)).to.be
          .false;
      });

      describe('reverts if', () => {
        it('specified interface ID is 0xffffffff', async () => {
          await expect(
            instance.$_setSupportsInterface('0xffffffff', true),
          ).to.be.revertedWithCustomError(
            instance,
            'Introspectable__InvalidInterfaceId',
          );
        });
      });
    });
  });
});
