import { MathMock, MathMock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Math', function () {
  let instance: MathMock;

  before(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new MathMock__factory(deployer).deploy();
  });

  describe('__internal', function () {
    describe('#abs(int256)', function () {
      it('returns the absolute value of a number', async () => {
        expect(await instance.callStatic.abs(-1)).to.equal(1);
        expect(await instance.callStatic.abs(0)).to.equal(0);
        expect(await instance.callStatic.abs(1)).to.equal(1);
      });
    });

    describe('#max(uint256,uint256)', function () {
      it('returns the greater of two numbers', async () => {
        expect(await instance.callStatic.max(1, 2)).to.equal(2);

        expect(await instance.callStatic.max(2, 1)).to.equal(2);

        expect(await instance.callStatic.max(1, 1)).to.equal(1);

        expect(await instance.callStatic.max(0, ethers.MaxUint256)).to.equal(
          ethers.MaxUint256,
        );
      });
    });

    describe('#min(uint256,uint256)', function () {
      it('returns the lesser of two numbers', async () => {
        expect(await instance.callStatic.min(1, 2)).to.equal(1);

        expect(await instance.callStatic.min(2, 1)).to.equal(1);

        expect(await instance.callStatic.min(1, 1)).to.equal(1);

        expect(await instance.callStatic.min(0, ethers.MaxUint256)).to.equal(0);
      });
    });

    describe('#average(uint256,uint256)', function () {
      it('returns the average of two positive numbers from 0 to maxUint256', async function () {
        expect(await instance.callStatic.average(11, 5)).to.equal(8);

        expect(await instance.callStatic.average(6, 5)).to.equal(5);

        expect(await instance.callStatic.average(0, 0)).to.equal(0);

        expect(
          await instance.callStatic.average(
            ethers.MaxUint256,
            ethers.MaxUint256,
          ),
        ).to.equal(ethers.MaxUint256);

        expect(
          await instance.callStatic.average(
            ethers.MaxUint256,
            ethers.MaxUint256.sub(1),
          ),
        ).to.equal(ethers.MaxUint256.sub(1));
      });
    });

    describe('#sqrt(uint256)', function () {
      it('returns the sqrt of a positive integer from 0 to maxUint256', async function () {
        expect(await instance.callStatic.sqrt(16)).to.eq(4);

        for (let i = 10; i < 16; i++) {
          expect(await instance.callStatic.sqrt(i.toString())).to.eq(3);
        }

        expect(await instance.callStatic.sqrt(0)).to.eq(0);

        expect(await instance.callStatic.sqrt(ethers.MaxUint256.sub(1))).to.eq(
          BigInt('340282366920938463463374607431768211455'),
        );
      });
    });
  });
});
