import { describeBehaviorOfERC165Base } from '@solidstate/spec';
import { $ERC165Base, $ERC165Base__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC165Base', () => {
  let instance: $ERC165Base;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ERC165Base__factory(deployer).deploy();

    await instance.$_setSupportsInterface('0x01ffc9a7', true);
  });

  describeBehaviorOfERC165Base(async () => instance, {
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
            'ERC165Base__InvalidInterfaceId',
          );
        });
      });
    });
  });
});
