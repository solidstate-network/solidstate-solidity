import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MathMock, MathMock__factory } from '../../typechain';

describe('Math', function () {
  let instance: MathMock;

  before(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new MathMock__factory(deployer).deploy();
  });

  describe('__internal', function () {
    describe('#average', function () {
      it('returns the average of two positive numbers from 0 to maxUint256', async function () {
        expect(
          await instance.average(
            ethers.BigNumber.from('11'),
            ethers.BigNumber.from('5'),
          ),
        ).to.equal(ethers.BigNumber.from('8'));

        expect(
          await instance.average(
            ethers.BigNumber.from('6'),
            ethers.BigNumber.from('5'),
          ),
        ).to.equal(ethers.BigNumber.from('5'));

        expect(
          await instance.average(
            ethers.BigNumber.from('0'),
            ethers.BigNumber.from('0'),
          ),
        ).to.equal(ethers.BigNumber.from('0'));

        expect(
          await instance.average(
            ethers.constants.MaxUint256,
            ethers.constants.MaxUint256,
          ),
        ).to.equal(ethers.constants.MaxUint256);
      });
    });

    describe('#sqrt', function () {
      it('returns the sqrt of a positive integer from 0 to maxUint256', async function () {
        expect(await instance.sqrt(ethers.BigNumber.from('16'))).to.eq(
          ethers.BigNumber.from('4'),
        );

        for (let i = 10; i < 16; i++) {
          expect(
            await instance.sqrt(ethers.BigNumber.from(i.toString())),
          ).to.eq(ethers.BigNumber.from('3'));
        }

        expect(await instance.sqrt(ethers.BigNumber.from('0'))).to.eq(
          ethers.BigNumber.from('0'),
        );
      });
    });
  });
});
