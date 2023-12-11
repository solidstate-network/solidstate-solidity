import { MathMock, MathMock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Math', () => {
  let instance: MathMock;

  before(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new MathMock__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#abs(int256)', () => {
      it('returns the absolute value of a number', async () => {
        expect(await instance.abs.staticCall(-1)).to.equal(1);
        expect(await instance.abs.staticCall(0)).to.equal(0);
        expect(await instance.abs.staticCall(1)).to.equal(1);
      });
    });

    describe('#max(uint256,uint256)', () => {
      it('returns the greater of two numbers', async () => {
        expect(await instance.max.staticCall(1, 2)).to.equal(2);

        expect(await instance.max.staticCall(2, 1)).to.equal(2);

        expect(await instance.max.staticCall(1, 1)).to.equal(1);

        expect(await instance.max.staticCall(0, ethers.MaxUint256)).to.equal(
          ethers.MaxUint256,
        );
      });
    });

    describe('#min(uint256,uint256)', () => {
      it('returns the lesser of two numbers', async () => {
        expect(await instance.min.staticCall(1, 2)).to.equal(1);

        expect(await instance.min.staticCall(2, 1)).to.equal(1);

        expect(await instance.min.staticCall(1, 1)).to.equal(1);

        expect(await instance.min.staticCall(0, ethers.MaxUint256)).to.equal(0);
      });
    });

    describe('#average(uint256,uint256)', () => {
      it('returns the average of two positive numbers from 0 to maxUint256', async () => {
        expect(await instance.average.staticCall(11, 5)).to.equal(8);

        expect(await instance.average.staticCall(6, 5)).to.equal(5);

        expect(await instance.average.staticCall(0, 0)).to.equal(0);

        expect(
          await instance.average.staticCall(
            ethers.MaxUint256,
            ethers.MaxUint256,
          ),
        ).to.equal(ethers.MaxUint256);

        expect(
          await instance.average.staticCall(
            ethers.MaxUint256,
            ethers.MaxUint256 - 1n,
          ),
        ).to.equal(ethers.MaxUint256 - 1n);
      });
    });

    describe('#sqrt(uint256)', () => {
      it('returns the sqrt of a positive integer from 0 to maxUint256', async () => {
        expect(await instance.sqrt.staticCall(16)).to.eq(4);

        for (let i = 10; i < 16; i++) {
          expect(await instance.sqrt.staticCall(i.toString())).to.eq(3);
        }

        expect(await instance.sqrt.staticCall(0)).to.eq(0);

        expect(await instance.sqrt.staticCall(ethers.MaxUint256 - 1n)).to.eq(
          BigInt('340282366920938463463374607431768211455'),
        );
      });
    });
  });
});
