import { describeBehaviorOfERC165Base } from '@solidstate/spec';
import {
  ERC165BaseMock,
  ERC165BaseMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC165Base', () => {
  let instance: ERC165BaseMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC165BaseMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC165Base(async () => instance, {
    interfaceIds: [],
  });

  describe('__internal', () => {
    describe('#_supportsInterface(bytes4)', () => {
      it('returns whether interface ID is supported', async () => {
        const interfaceId = ethers.randomBytes(4);

        expect(await instance.__supportsInterface.staticCall(interfaceId)).to.be
          .false;
        await instance.__setSupportsInterface(interfaceId, true);
        expect(await instance.__supportsInterface.staticCall(interfaceId)).to.be
          .true;
      });
    });

    describe('#_setSupportsInterface(bytes4,bool)', () => {
      it('updates support status for given interface', async () => {
        const interfaceId = ethers.randomBytes(4);

        await instance.__setSupportsInterface(interfaceId, true);
        expect(await instance.__supportsInterface.staticCall(interfaceId)).to.be
          .true;
        await instance.__setSupportsInterface(interfaceId, false);
        expect(await instance.__supportsInterface.staticCall(interfaceId)).to.be
          .false;
      });

      describe('reverts if', () => {
        it('specified interface ID is 0xffffffff', async () => {
          await expect(
            instance.__setSupportsInterface('0xffffffff', true),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC165Base__InvalidInterfaceId',
          );
        });
      });
    });
  });
});
