import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { deployMockContract } from 'ethereum-waffle';
import { BytesLike, BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { AddressUtilsMock, AddressUtilsMock__factory } from '../../typechain';

describe('AddressUtils', async () => {
  let instance: AddressUtilsMock;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new AddressUtilsMock__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('toString', () => {
      it('returns a string from an address', async () => {
        expect(
          ethers.utils.getAddress(
            await instance['toString(address)'](deployer.address),
          ),
        ).to.eq(deployer.address);
      });
    });

    describe('isContract', () => {
      it('returns true when an address is a contract', async () => {
        expect(await instance.isContract(instance.address)).to.be.true;
      });

      it('returns false when an address is not a contract', async () => {
        expect(await instance.isContract(deployer.address)).to.be.false;
      });
    });

    describe('sendValue', () => {
      it('transfers given value to target contract', async () => {
        const value = ethers.constants.Two;

        await deployer.sendTransaction({ to: instance.address, value });

        const targetContract = await new AddressUtilsMock__factory(
          deployer,
        ).deploy();
        const target = targetContract.address;

        await expect(() =>
          instance.connect(deployer).sendValue(target, value),
        ).to.changeEtherBalances([instance, targetContract], [-value, value]);
      });
    });

    describe('functionCallWithValue', () => {
      it('returns the bytes representation of the return value of the target function', async () => {
        const mock = await deployMockContract(deployer, [
          'function fn () external payable returns (bool)',
        ]);

        await mock.mock.fn.returns(true);

        const target = mock.address;
        const mocked = await mock.populateTransaction.fn();
        const data = mocked.data as BytesLike;

        expect(
          await instance
            .connect(deployer)
            .callStatic.functionCallWithValue(
              target,
              data,
              ethers.constants.Zero,
              '',
            ),
        ).to.equal(
          ethers.utils.hexZeroPad(
            ethers.utils.hexlify(ethers.constants.One),
            32,
          ),
        );
      });

      it('transfers given value to target contract', async () => {
        const value = ethers.constants.Two;

        await deployer.sendTransaction({ to: instance.address, value });

        const mock = await deployMockContract(deployer, [
          'function fn () external payable returns (bool)',
        ]);

        await mock.mock.fn.returns(true);

        const target = mock.address;
        const mocked = await mock.populateTransaction.fn();
        const data = mocked.data as BytesLike;

        await expect(() =>
          instance
            .connect(deployer)
            .functionCallWithValue(target, data, value, ''),
        ).to.changeEtherBalances([instance, mock], [-value, value]);
      });

      describe('reverts if', () => {
        it('contract balance is insufficient for the call', async () => {
          await expect(
            instance
              .connect(deployer)
              .functionCallWithValue(
                instance.address,
                '0x',
                ethers.constants.One,
                '',
              ),
          ).to.be.revertedWith('AddressUtils: insufficient balance for call');
        });

        it('target is not a contract', async () => {
          await expect(
            instance.functionCallWithValue(
              ethers.constants.AddressZero,
              '0x',
              ethers.constants.Zero,
              '',
            ),
          ).to.be.revertedWith('AddressUtils: function call to non-contract');
        });

        it('target function is not payable and value is included', async () => {
          const value = ethers.constants.Two;

          await deployer.sendTransaction({ to: instance.address, value });

          const mock = await deployMockContract(deployer, [
            'function fn () external view returns (bool)',
          ]);

          await mock.mock.fn.returns(true);

          const target = mock.address;
          const mocked = await mock.populateTransaction.fn();
          const data = mocked.data as BytesLike;

          // TODO: this function should revert because it is explicitly nonpayable

          await expect(
            instance
              .connect(deployer)
              .functionCallWithValue(target, data, value, ''),
          ).to.be.reverted;
        });

        it('target contract reverts, with target contract error message', async () => {
          const revertReason = 'REVERT_REASON';

          const mock = await deployMockContract(deployer, [
            'function fn () external payable returns (bool)',
          ]);

          await mock.mock.fn.revertsWithReason(revertReason);

          const target = mock.address;
          const mocked = await mock.populateTransaction.fn();
          const data = mocked.data as BytesLike;

          await expect(
            instance
              .connect(deployer)
              .functionCallWithValue(target, data, ethers.constants.Zero, ''),
          ).to.be.revertedWith(revertReason);
        });

        it('target contract reverts, with provided error message', async () => {
          const revertReason = 'REVERT_REASON';

          await expect(
            instance
              .connect(deployer)
              .functionCallWithValue(
                instance.address,
                '0x01',
                ethers.constants.Zero,
                revertReason,
              ),
          ).to.be.revertedWith(revertReason);
        });
      });
    });
  });
});
