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
    describe('#toString', () => {
      it('returns a string from an address', async () => {
        expect(
          ethers.utils.getAddress(
            await instance['toString(address)'](deployer.address),
          ),
        ).to.eq(deployer.address);
      });
    });

    describe('#isContract', () => {
      it('returns true when an address is a contract', async () => {
        expect(await instance.isContract(instance.address)).to.be.true;
      });

      it('returns false when an address is not a contract', async () => {
        expect(await instance.isContract(deployer.address)).to.be.false;
      });
    });

    describe('#sendValue', () => {
      it('transfers given value to given address', async () => {
        const value = ethers.constants.Two;

        await deployer.sendTransaction({ to: instance.address, value });

        const target = deployer;

        await expect(() =>
          instance.connect(deployer).sendValue(target.address, value),
        ).to.changeEtherBalances([instance, target], [-value, value]);
      });

      describe('reverts if', () => {
        it('target contrect rejects transfer', async () => {
          const value = ethers.constants.Two;

          await deployer.sendTransaction({ to: instance.address, value });

          const mock = await deployMockContract(deployer, []);

          await expect(
            instance.connect(deployer).sendValue(mock.address, value),
          ).to.be.revertedWith('AddressUtils: failed to send value');
        });
      });
    });

    describe('#functionCall(address,bytes)', () => {
      it('returns the bytes representation of the return value of the target function', async () => {
        const mock = await deployMockContract(deployer, [
          'function fn() external returns (bool)',
        ]);

        await mock.mock.fn.returns(true);

        const target = mock.address;
        const mocked = await mock.populateTransaction.fn();
        const data = mocked.data as BytesLike;

        expect(
          await instance
            .connect(deployer)
            .callStatic['functionCall(address,bytes)'](target, data),
        ).to.equal(
          ethers.utils.hexZeroPad(
            ethers.utils.hexlify(ethers.constants.One),
            32,
          ),
        );
      });

      describe('reverts if', () => {
        it('low level call is unsuccessful', async () => {
          const target = instance.address;
          const data = (await instance.populateTransaction.revertTest())
            .data as BytesLike;

          await expect(
            instance
              .connect(deployer)
              .callStatic['functionCall(address,bytes)'](target, data),
          ).to.be.revertedWith('AddressUtils: failed low-level call');
        });
      });
    });

    describe('#functionCall(address,bytes,string)', () => {
      it('returns the bytes representation of the return value of the target function', async () => {
        const mock = await deployMockContract(deployer, [
          'function fn () external payable returns (bool)',
        ]);
        const revertReason = 'REVERT_REASON';

        await mock.mock.fn.returns(true);

        const target = mock.address;
        const mocked = await mock.populateTransaction.fn();
        const data = mocked.data as BytesLike;

        expect(
          await instance
            .connect(deployer)
            .callStatic['functionCall(address,bytes,string)'](
              target,
              data,
              revertReason,
            ),
        ).to.equal(
          ethers.utils.hexZeroPad(
            ethers.utils.hexlify(ethers.constants.One),
            32,
          ),
        );
      });

      //Does this need to be here? It is a repetition of #functionCallWithValue test case
      describe('reverts if', () => {
        it('target contract reverts, with provided error message', async () => {
          const revertReason = 'REVERT_REASON';

          await expect(
            instance
              .connect(deployer)
              ['functionCall(address,bytes,string)'](
                instance.address,
                '0x01',
                revertReason,
              ),
          ).to.be.revertedWith(revertReason);
        });
      });
    });

    describe('#functionCallWithValue(address,bytes,uint256)', () => {
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
            .callStatic['functionCallWithValue(address,bytes,uint256)'](
              target,
              data,
              ethers.constants.Zero,
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
            ['functionCallWithValue(address,bytes,uint256)'](
              target,
              data,
              value,
            ),
        ).to.changeEtherBalances([instance, mock], [-value, value]);
      });

      describe('reverts if', () => {
        //Does this need to be here?
        it('low level call is unsuccessful', async () => {
          const target = instance.address;
          const data = (await instance.populateTransaction.revertTest())
            .data as BytesLike;

          await expect(
            instance
              .connect(deployer)
              .callStatic['functionCallWithValue(address,bytes,uint256)'](
                target,
                data,
                ethers.constants.Zero,
              ),
          ).to.be.revertedWith('AddressUtils: failed low-level call');
        });

        it('target function is not payable and value is included', async () => {
          const value = ethers.constants.Two;

          await deployer.sendTransaction({ to: instance.address, value });
          const target = instance.address;
          const data = (await instance.populateTransaction.revertTest())
            .data as BytesLike;

          await expect(
            instance
              .connect(deployer)
              .callStatic['functionCallWithValue(address,bytes,uint256)'](
                target,
                data,
                value,
              ),
          ).to.be.revertedWith('AddressUtils: failed low-level call');
        });
      });
    });

    describe('#functionCallWithValue(address,bytes,uint256,string)', () => {
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
            .callStatic['functionCallWithValue(address,bytes,uint256,string)'](
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
            ['functionCallWithValue(address,bytes,uint256,string)'](
              target,
              data,
              value,
              '',
            ),
        ).to.changeEtherBalances([instance, mock], [-value, value]);
      });

      describe('reverts if', () => {
        it('contract balance is insufficient for the call', async () => {
          await expect(
            instance
              .connect(deployer)
              ['functionCallWithValue(address,bytes,uint256,string)'](
                instance.address,
                '0x',
                ethers.constants.One,
                '',
              ),
          ).to.be.revertedWith('AddressUtils: insufficient balance for call');
        });

        it('target is not a contract', async () => {
          await expect(
            instance['functionCallWithValue(address,bytes,uint256,string)'](
              ethers.constants.AddressZero,
              '0x',
              ethers.constants.Zero,
              '',
            ),
          ).to.be.revertedWith('AddressUtils: function call to non-contract');
        });

        it('target function is not payable and value is included', async () => {
          const value = ethers.constants.Two;
          const revertReason = 'REVERT_REASON';

          await deployer.sendTransaction({ to: instance.address, value });

          const targetContract = await new AddressUtilsMock__factory(
            deployer,
          ).deploy();

          const target = targetContract.address;

          // the sendValue function is used as a transaction target because it is itself nonpayable

          const { data } = (await targetContract.populateTransaction.sendValue(
            ethers.constants.AddressZero,
            ethers.constants.Zero,
          )) as { data: BytesLike };

          await expect(
            instance
              .connect(deployer)
              ['functionCallWithValue(address,bytes,uint256,string)'](
                target,
                data,
                value,
                revertReason,
              ),
          ).to.be.revertedWith(revertReason);
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
              ['functionCallWithValue(address,bytes,uint256,string)'](
                target,
                data,
                ethers.constants.Zero,
                '',
              ),
          ).to.be.revertedWith(revertReason);
        });

        it('target contract reverts, with provided error message', async () => {
          const revertReason = 'REVERT_REASON';

          await expect(
            instance
              .connect(deployer)
              ['functionCallWithValue(address,bytes,uint256,string)'](
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
