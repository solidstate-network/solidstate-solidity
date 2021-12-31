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
        const deployerAddress = await deployer.getAddress();
        const stringAddress = await instance['toString(address)'](
          deployerAddress,
        );

        expect(ethers.utils.getAddress(stringAddress)).to.eq(deployerAddress);
      });
    });

    describe('isContract', () => {
      it('returns true when an address is a contract', async () => {
        expect(await instance.isContract(instance.address)).to.eq(true);
      });

      it('returns false when an address is not a contract', async () => {
        expect(await instance.isContract(await deployer.getAddress())).to.eq(
          false,
        );
      });
    });

    describe('sendValue', () => {
      it('checks that the ETH balance of receiver has increased by the value sent', async () => {
        const receiver = await deployer.getAddress();
        const balanceBeforeSend = await deployer.getBalance();

        await deployer.sendTransaction({
          to: instance.address,
          value: ethers.utils.parseEther('5.0'),
        });
        await instance
          .connect(deployer)
          .sendValue(receiver, ethers.utils.parseEther('4.0'));

        const balanceAfterSend = await deployer.getBalance();
        expect(balanceAfterSend).to.eq(
          balanceBeforeSend.add(ethers.utils.parseEther('4.0')),
        );
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
          'function fn () external payable',
        ]);

        await mock.mock.fn.returns();

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
                ethers.utils.parseEther('100'),
                'error',
              ),
          ).to.be.revertedWith('AddressUtils: insufficient balance for call');
        });

        it('target is not a contract', async () => {
          await expect(
            instance.functionCallWithValue(
              await deployer.getAddress(),
              '0x',
              ethers.utils.parseEther('5'),
              'error',
            ),
          ).to.be.revertedWith('AddressUtils: function call to non-contract');
        });

        it('unsuccesful call is made, with matching error string', async () => {
          const revertReason = 'REVERT_REASON';

          const initContractBalance = await ethers.provider.getBalance(
            instance.address,
          );
          await deployer.sendTransaction({
            to: instance.address,
            value: ethers.utils.parseEther('10.0'),
          });
          expect(await ethers.provider.getBalance(instance.address)).to.eq(
            initContractBalance.add(ethers.utils.parseEther('10.0')),
          );

          const mock = await deployMockContract(deployer, [
            'function fn () external payable',
          ]);

          // TODO: separate test for revert with no reason
          await mock.mock.fn.revertsWithReason(revertReason);

          const target = mock.address;
          const mocked = await mock.populateTransaction.fn();
          const data = mocked.data as BytesLike;

          await expect(
            instance
              .connect(deployer)
              .functionCallWithValue(
                target,
                data,
                ethers.utils.parseEther('5.0'),
                'error',
              ),
          ).to.be.revertedWith(revertReason);
        });
      });
    });
  });
});
