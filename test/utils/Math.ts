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
        expect(
          await instance.callStatic.max(
            ethers.constants.One,
            ethers.constants.Two,
          ),
        ).to.equal(ethers.constants.Two);

        expect(
          await instance.callStatic.max(
            ethers.constants.Two,
            ethers.constants.One,
          ),
        ).to.equal(ethers.constants.Two);

        expect(
          await instance.callStatic.max(
            ethers.constants.One,
            ethers.constants.One,
          ),
        ).to.equal(ethers.constants.One);

        expect(
          await instance.callStatic.max(
            ethers.constants.Zero,
            ethers.constants.MaxUint256,
          ),
        ).to.equal(ethers.constants.MaxUint256);
      });
    });

    describe('#min(uint256,uint256)', function () {
      it('returns the lesser of two numbers', async () => {
        expect(
          await instance.callStatic.min(
            ethers.constants.One,
            ethers.constants.Two,
          ),
        ).to.equal(ethers.constants.One);

        expect(
          await instance.callStatic.min(
            ethers.constants.Two,
            ethers.constants.One,
          ),
        ).to.equal(ethers.constants.One);

        expect(
          await instance.callStatic.min(
            ethers.constants.One,
            ethers.constants.One,
          ),
        ).to.equal(ethers.constants.One);

        expect(
          await instance.callStatic.min(
            ethers.constants.Zero,
            ethers.constants.MaxUint256,
          ),
        ).to.equal(ethers.constants.Zero);
      });
    });

    describe('#average(uint256,uint256)', function () {
      it('returns the average of two positive numbers from 0 to maxUint256', async function () {
        expect(
          await instance.callStatic.average(
            ethers.BigNumber.from('11'),
            ethers.BigNumber.from('5'),
          ),
        ).to.equal(ethers.BigNumber.from('8'));

        expect(
          await instance.callStatic.average(
            ethers.BigNumber.from('6'),
            ethers.BigNumber.from('5'),
          ),
        ).to.equal(ethers.BigNumber.from('5'));

        expect(
          await instance.callStatic.average(
            ethers.BigNumber.from('0'),
            ethers.BigNumber.from('0'),
          ),
        ).to.equal(ethers.BigNumber.from('0'));

        expect(
          await instance.callStatic.average(
            ethers.constants.MaxUint256,
            ethers.constants.MaxUint256,
          ),
        ).to.equal(ethers.constants.MaxUint256);

        expect(
          await instance.callStatic.average(
            ethers.constants.MaxUint256,
            ethers.constants.MaxUint256.sub(ethers.constants.One),
          ),
        ).to.equal(ethers.constants.MaxUint256.sub(ethers.constants.One));
      });
    });

    describe('#sqrt(uint256)', function () {
      it('returns the sqrt of a positive integer from 0 to maxUint256', async function () {
        expect(
          await instance.callStatic.sqrt(ethers.BigNumber.from('16')),
        ).to.eq(ethers.BigNumber.from('4'));

        for (let i = 10; i < 16; i++) {
          expect(
            await instance.callStatic.sqrt(ethers.BigNumber.from(i.toString())),
          ).to.eq(ethers.BigNumber.from('3'));
        }

        expect(
          await instance.callStatic.sqrt(ethers.BigNumber.from('0')),
        ).to.eq(ethers.BigNumber.from('0'));

        expect(
          await instance.callStatic.sqrt(
            ethers.constants.MaxUint256.sub(ethers.BigNumber.from('1')),
          ),
        ).to.eq(
          ethers.BigNumber.from('340282366920938463463374607431768211455'),
        );
      });
    });
  });
});
