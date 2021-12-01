import { expect } from 'chai';
import { ethers } from 'hardhat';
import { UintUtilsMock, UintUtilsMock__factory } from '../../typechain';

describe('UintUtils', function () {
  let instance: UintUtilsMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new UintUtilsMock__factory(deployer).deploy();
  });

  describe('__internal', function () {
    describe('#toString', function () {
      it('returns base-10 string representation of number', async function () {
        for (let i = 0; i < 12; i++) {
          const string = i.toString();
          const number = ethers.BigNumber.from(string);
          expect(
            await instance.callStatic['toString(uint256)'](number),
          ).to.equal(string);
        }

        expect(
          await instance.callStatic['toString(uint256)'](
            ethers.constants.MaxUint256,
          ),
        ).to.equal(ethers.constants.MaxUint256.toString());
      });
    });

    describe('#toHexString', function () {
      describe('(uint256)', function () {
        it('returns 0 if input is 0', async () => {
          const zeroNumber = ethers.BigNumber.from('0');
          expect(
            await instance.callStatic['toHexString(uint256)'](zeroNumber),
          ).to.equal('0x00');
        });

        it('returns correct hexadecimal string representation of a number', async () => {
          const inputValues = [
            '1000',
            '1',
            '12345',
            '85746201361230',
            '999983',
          ];
          const outputValues = [
            '0x03e8',
            '0x01',
            '0x3039',
            '0x4dfc57df7b4e',
            '0x0f422f',
          ];
          for (let i = 0; i < inputValues.length; i++) {
            expect(
              await instance.callStatic['toHexString(uint256)'](
                ethers.BigNumber.from(inputValues[i]),
              ),
            ).to.equal(outputValues[i]);
          }
        });
      });

      describe('(uint256,uint256)', function () {
        it('Fails if length input is 0 and value is nonzero', async () => {
          await expect(
            instance.callStatic['toHexString(uint256,uint256)'](
              ethers.BigNumber.from('100'),
              ethers.BigNumber.from('0'),
            ),
          ).to.be.revertedWith('Strings: hex length insufficient');
        });

        it('Should return correct hexString representation for matching value and length pairs', async () => {
          const inputValues = [
            '1000',
            '1',
            '12345',
            '85746201361230',
            '999983',
          ];
          const inputLengths = ['2', '1', '2', '6', '3'];
          const outputValues = [
            '0x03e8',
            '0x01',
            '0x3039',
            '0x4dfc57df7b4e',
            '0x0f422f',
          ];

          for (let i = 0; i < inputValues.length; i++) {
            expect(
              await instance.callStatic['toHexString(uint256,uint256)'](
                ethers.BigNumber.from(inputValues[i]),
                ethers.BigNumber.from(inputLengths[i]),
              ),
            ).to.equal(outputValues[i]);
          }
        });
      });
    });
  });
});
