import {
  __hh_exposed_Multicall,
  __hh_exposed_Multicall__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BytesLike } from 'ethers';
import { ethers } from 'hardhat';

describe('Multicall', () => {
  let instance: __hh_exposed_Multicall;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_Multicall__factory(deployer).deploy();
  });

  // TODO: move to behavior tests

  describe('#multicall(bytes[])', () => {
    it('returns empty array if no call data is passed', async () => {
      expect(await instance.multicall.staticCall([])).to.deep.equal([]);
    });

    it('returns array of response data', async () => {
      // use the built-in hardhat-exposed public constant as a function with a return value
      const result = await instance.multicall.staticCall([
        (await instance.__hh_exposed_bytecode_marker.populateTransaction())
          .data as BytesLike,
      ]);

      expect(result).to.deep.equal([
        '0x686172646861742d6578706f7365640000000000000000000000000000000000',
      ]);
    });

    describe('reverts if', () => {
      it('component function call reverts', async () => {
        // use the built-in hardhat-exposed public constant as a function that will not revert
        console.log(
          (await instance.__hh_exposed_bytecode_marker.populateTransaction())
            .data as BytesLike,
        );
        await expect(
          instance.multicall([
            (await instance.__hh_exposed_bytecode_marker.populateTransaction())
              .data as BytesLike,
            ethers.randomBytes(4),
          ]),
        ).to.be.reverted;
      });
    });
  });
});
