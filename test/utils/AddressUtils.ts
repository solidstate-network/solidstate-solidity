import { TransactionResponse } from '@ethersproject/abstract-provider';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BytesLike } from 'ethers';
import { ethers } from 'hardhat';

import { AddressUtilsMock, AddressUtilsMock__factory } from '../../typechain';

describe('AddressUtils', async () => {
  let instance: AddressUtilsMock;
  let secondInstance: AddressUtilsMock;
  let deployer: SignerWithAddress;
  let Alice: SignerWithAddress;

  beforeEach(async () => {
    [deployer, Alice] = await ethers.getSigners();
    instance = await new AddressUtilsMock__factory(deployer).deploy();
    secondInstance = await new AddressUtilsMock__factory(deployer).deploy();
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

        await Alice.sendTransaction({
          to: instance.address,
          value: ethers.utils.parseEther('5.0'),
        });
        await instance
          .connect(Alice)
          .sendValue(receiver, ethers.utils.parseEther('4.0'));

        const balanceAfterSend = await deployer.getBalance();
        expect(balanceAfterSend).to.eq(
          balanceBeforeSend.add(ethers.utils.parseEther('4.0')),
        );
      });
    });

    describe('functionCallWithValue', () => {
      it('executes the correct function and transfers the correct value', async () => {
        //TODO
      });

      describe('reverts', () => {
        it('fails when callee balance is insufficient for the call', async () => {
          const initContractBalance = await ethers.provider.getBalance(
            instance.address,
          );
          await Alice.sendTransaction({
            to: instance.address,
            value: ethers.utils.parseEther('10.0'),
          });

          expect(await ethers.provider.getBalance(instance.address)).to.eq(
            initContractBalance.add(ethers.utils.parseEther('10.0')),
          );

          await expect(
            instance.functionCallWithValue(
              await deployer.getAddress(),
              '0x',
              ethers.utils.parseEther('100'),
              'error',
            ),
          ).to.be.revertedWith('AddressUtils: insufficient balance for call');
        });

        it('fails when the target is not a contract', async () => {
          const initContractBalance = await ethers.provider.getBalance(
            instance.address,
          );
          await Alice.sendTransaction({
            to: instance.address,
            value: ethers.utils.parseEther('10.0'),
          });
          expect(await ethers.provider.getBalance(instance.address)).to.eq(
            initContractBalance.add(ethers.utils.parseEther('10.0')),
          );

          await expect(
            instance.functionCallWithValue(
              await deployer.getAddress(),
              '0x',
              ethers.utils.parseEther('5'),
              'error',
            ),
          ).to.be.revertedWith('AddressUtils: function call to non-contract');
        });

        it('fails when unsuccesful call is made, with matching error string', async () => {
          const initContractBalance = await ethers.provider.getBalance(
            instance.address,
          );
          await Alice.sendTransaction({
            to: instance.address,
            value: ethers.utils.parseEther('10.0'),
          });
          expect(await ethers.provider.getBalance(instance.address)).to.eq(
            initContractBalance.add(ethers.utils.parseEther('10.0')),
          );

          const data = (await instance.populateTransaction.callTest())
            .data as BytesLike;
          await expect(
            instance
              .connect(Alice)
              .functionCallWithValue(
                secondInstance.address,
                data,
                ethers.utils.parseEther('5'),
                'error',
              ),
          ).to.be.revertedWith('error');
        });
      });
    });
  });
});
