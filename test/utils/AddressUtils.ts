import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { setBalance } from '@nomicfoundation/hardhat-network-helpers';
import { deployMockContract } from '@solidstate/library';
import {
  $Ownable__factory,
  AddressUtils__factory,
  $AddressUtils,
  $AddressUtils__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BytesLike } from 'ethers';
import { ethers } from 'hardhat';

describe('AddressUtils', async () => {
  let instance: $AddressUtils;
  let deployer: SignerWithAddress;

  // the custom errors are not available on the $AddressUtils ABI
  // a placeholder interface is needed in order to expose them to revertedWithCustomError matcher
  const placeholder = { interface: AddressUtils__factory.createInterface() };

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $AddressUtils__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#toString(address)', () => {
      it('returns a string from an address', async () => {
        expect(
          ethers.getAddress(
            await instance.$toString.staticCall(deployer.address),
          ),
        ).to.eq(deployer.address);
      });
    });

    describe('#isContract(address)', () => {
      it('returns true when an address is a contract', async () => {
        expect(await instance.$isContract(await instance.getAddress())).to.be
          .true;
      });

      it('returns false when an address is not a contract', async () => {
        expect(await instance.$isContract(deployer.address)).to.be.false;
      });
    });

    describe('#sendValue(address,uint256)', () => {
      it('transfers given value to given address', async () => {
        const value = 2n;

        await setBalance(await instance.getAddress(), value);

        const target = deployer;

        await expect(() =>
          instance.connect(deployer).$sendValue(target.address, value),
        ).to.changeEtherBalances([instance, target], [-value, value]);
      });

      describe('reverts if', () => {
        it('target contract rejects transfer', async () => {
          const value = 2n;

          await setBalance(await instance.getAddress(), value);

          const mock = await deployMockContract(deployer, []);

          await mock.mock.receive.reverts();

          await expect(
            instance.connect(deployer).$sendValue(mock.address, value),
          ).to.be.revertedWithCustomError(
            instance,
            'AddressUtils__SendValueFailed',
          );
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
        const { data } = (await mock.populateTransaction.fn()) as {
          data: BytesLike;
        };

        expect(
          await instance
            .connect(deployer)
            ['$functionCall(address,bytes)'].staticCall(target, data),
        ).to.equal(ethers.zeroPadValue('0x01', 32));
      });

      describe('reverts if', () => {
        it('target is not a contract', async () => {
          await expect(
            instance['$functionCall(address,bytes)'](ethers.ZeroAddress, '0x'),
          ).to.be.revertedWithCustomError(
            instance,
            'AddressUtils__NotContract',
          );
        });

        it('target contract reverts, with target contract error message', async () => {
          const revertReason = 'REVERT_REASON';

          const mock = await deployMockContract(deployer, [
            'function fn () external payable returns (bool)',
          ]);

          await mock.mock.fn.revertsWithReason(revertReason);

          const target = mock.address;
          const { data } = (await mock.populateTransaction.fn()) as {
            data: BytesLike;
          };

          await expect(
            instance
              .connect(deployer)
              ['$functionCall(address,bytes)'](target, data),
          ).to.be.revertedWith(revertReason);
        });

        it('target contract reverts, with default error message', async () => {
          const targetContract = await new AddressUtils__factory(
            deployer,
          ).deploy();

          await expect(
            instance
              .connect(deployer)
              [
                '$functionCall(address,bytes)'
              ](await targetContract.getAddress(), '0x'),
          ).to.be.revertedWithCustomError(
            placeholder,
            'AddressUtils__FailedCall',
          );
        });
      });
    });

    describe('#functionCall(address,bytes,bytes4)', () => {
      it('returns the bytes representation of the return value of the target function', async () => {
        const mock = await deployMockContract(deployer, [
          'function fn () external payable returns (bool)',
        ]);
        await mock.mock.fn.returns(true);

        const target = mock.address;
        const { data } = (await mock.populateTransaction.fn()) as {
          data: BytesLike;
        };

        expect(
          await instance
            .connect(deployer)
            [
              '$functionCall(address,bytes,bytes4)'
            ].staticCall(target, data, ethers.randomBytes(4)),
        ).to.equal(ethers.zeroPadValue('0x01', 32));
      });

      describe('reverts if', () => {
        it('target is not a contract', async () => {
          await expect(
            instance['$functionCall(address,bytes,bytes4)'](
              ethers.ZeroAddress,
              '0x',
              ethers.randomBytes(4),
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'AddressUtils__NotContract',
          );
        });

        it('target contract reverts, with target contract error message', async () => {
          const revertReason = 'REVERT_REASON';

          const mock = await deployMockContract(deployer, [
            'function fn () external payable returns (bool)',
          ]);

          await mock.mock.fn.revertsWithReason(revertReason);

          const target = mock.address;
          const { data } = (await mock.populateTransaction.fn()) as {
            data: BytesLike;
          };

          await expect(
            instance
              .connect(deployer)
              [
                '$functionCall(address,bytes,bytes4)'
              ](target, data, ethers.randomBytes(4)),
          ).to.be.revertedWith(revertReason);
        });

        it('target contract reverts, with provided custom error', async () => {
          // unrelated custom error, but it must exist on the contract due to limitiations with revertedWithCustomError matcher
          const customError = 'AddressUtils__InsufficientBalance';
          const revertReason =
            placeholder.interface.getError(customError)?.selector!;

          const targetContract = await new AddressUtils__factory(
            deployer,
          ).deploy();

          await expect(
            instance
              .connect(deployer)
              [
                '$functionCall(address,bytes,bytes4)'
              ](await targetContract.getAddress(), '0x', revertReason),
          ).to.be.revertedWithCustomError(instance, customError);
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
        const { data } = (await mock.populateTransaction.fn()) as {
          data: BytesLike;
        };

        expect(
          await instance
            .connect(deployer)
            [
              '$functionCallWithValue(address,bytes,uint256)'
            ].staticCall(target, data, 0),
        ).to.equal(ethers.zeroPadValue('0x01', 32));
      });

      it('transfers given value to target contract', async () => {
        const value = 2n;

        await setBalance(await instance.getAddress(), value);

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
            [
              '$functionCallWithValue(address,bytes,uint256)'
            ](target, data, value),
        ).to.changeEtherBalances([instance, mock], [-value, value]);
      });

      describe('reverts if', () => {
        it('target is not a contract', async () => {
          await expect(
            instance['$functionCallWithValue(address,bytes,uint256)'](
              ethers.ZeroAddress,
              '0x',
              0,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'AddressUtils__NotContract',
          );
        });

        it('contract balance is insufficient', async () => {
          await expect(
            instance
              .connect(deployer)
              [
                '$functionCallWithValue(address,bytes,uint256)'
              ](await instance.getAddress(), '0x', 1),
          ).to.be.revertedWithCustomError(
            instance,
            'AddressUtils__InsufficientBalance',
          );
        });

        it('target function is not payable and value is included', async () => {
          const value = 2n;

          await setBalance(await instance.getAddress(), value);

          const targetContract = await new $Ownable__factory(deployer).deploy();

          await targetContract.$_setOwner(await instance.getAddress());

          // the hardhat-exposed built-in bytecode marker is used as the transaction target because it is nonpayable

          const { data } = (await targetContract.__hh_exposed_bytecode_marker
            .populateTransaction
            // ethers.ZeroAddress,
            ()) as { data: BytesLike };

          await expect(
            instance
              .connect(deployer)
              [
                '$functionCallWithValue(address,bytes,uint256)'
              ](await targetContract.getAddress(), data, value),
          ).to.be.revertedWithCustomError(
            placeholder,
            'AddressUtils__FailedCallWithValue',
          );
        });

        it('target contract reverts, with target contract error message', async () => {
          const revertReason = 'REVERT_REASON';

          const mock = await deployMockContract(deployer, [
            'function fn () external payable returns (bool)',
          ]);

          await mock.mock.fn.revertsWithReason(revertReason);

          const target = mock.address;
          const { data } = (await mock.populateTransaction.fn()) as {
            data: BytesLike;
          };

          await expect(
            instance
              .connect(deployer)
              [
                '$functionCallWithValue(address,bytes,uint256)'
              ](target, data, 0),
          ).to.be.revertedWith(revertReason);
        });

        it('target contract reverts, with default error message', async () => {
          const targetContract = await new AddressUtils__factory(
            deployer,
          ).deploy();

          await expect(
            instance
              .connect(deployer)
              [
                '$functionCallWithValue(address,bytes,uint256)'
              ](await targetContract.getAddress(), '0x', 0),
          ).to.be.revertedWithCustomError(
            placeholder,
            'AddressUtils__FailedCallWithValue',
          );
        });
      });
    });

    describe('#functionCallWithValue(address,bytes,uint256,bytes4)', () => {
      it('returns the bytes representation of the return value of the target function', async () => {
        const mock = await deployMockContract(deployer, [
          'function fn () external payable returns (bool)',
        ]);

        await mock.mock.fn.returns(true);

        const target = mock.address;
        const { data } = (await mock.populateTransaction.fn()) as {
          data: BytesLike;
        };

        expect(
          await instance
            .connect(deployer)
            [
              '$functionCallWithValue(address,bytes,uint256,bytes4)'
            ].staticCall(target, data, 0, ethers.randomBytes(4)),
        ).to.equal(ethers.zeroPadValue('0x01', 32));
      });

      it('transfers given value to target contract', async () => {
        const value = 2n;

        await setBalance(await instance.getAddress(), value);

        const mock = await deployMockContract(deployer, [
          'function fn () external payable returns (bool)',
        ]);

        await mock.mock.fn.returns(true);

        const target = mock.address;
        const { data } = (await mock.populateTransaction.fn()) as {
          data: BytesLike;
        };

        await expect(() =>
          instance
            .connect(deployer)
            [
              '$functionCallWithValue(address,bytes,uint256,bytes4)'
            ](target, data, value, ethers.randomBytes(4)),
        ).to.changeEtherBalances([instance, mock], [-value, value]);
      });

      describe('reverts if', () => {
        it('target is not a contract', async () => {
          await expect(
            instance['$functionCallWithValue(address,bytes,uint256,bytes4)'](
              ethers.ZeroAddress,
              '0x',
              0,
              ethers.randomBytes(4),
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'AddressUtils__NotContract',
          );
        });

        it('contract balance is insufficient', async () => {
          await expect(
            instance
              .connect(deployer)
              [
                '$functionCallWithValue(address,bytes,uint256,bytes4)'
              ](await instance.getAddress(), '0x', 1, ethers.randomBytes(4)),
          ).to.be.revertedWithCustomError(
            instance,
            'AddressUtils__InsufficientBalance',
          );
        });

        it('target function is not payable and value is included, with provided custom error', async () => {
          const value = 2n;
          // unrelated custom error, but it must exist on the contract due to limitiations with revertedWithCustomError matcher
          const customError = 'AddressUtils__InsufficientBalance';
          const revertReason =
            placeholder.interface.getError(customError)?.selector!;

          await setBalance(await instance.getAddress(), value);

          const targetContract = await new $Ownable__factory(deployer).deploy();

          await targetContract.$_setOwner(await instance.getAddress());

          // the hardhat-exposed built-in bytecode marker is used as the transaction target because it is nonpayable

          const { data } =
            (await targetContract.__hh_exposed_bytecode_marker.populateTransaction()) as {
              data: BytesLike;
            };

          await expect(
            instance
              .connect(deployer)
              [
                '$functionCallWithValue(address,bytes,uint256,bytes4)'
              ](await targetContract.getAddress(), data, value, revertReason),
          ).to.be.revertedWithCustomError(instance, customError);
        });

        it('target contract reverts, with target contract error message', async () => {
          const revertReason = 'REVERT_REASON';

          const mock = await deployMockContract(deployer, [
            'function fn () external payable returns (bool)',
          ]);

          await mock.mock.fn.revertsWithReason(revertReason);

          const target = mock.address;
          const { data } = (await mock.populateTransaction.fn()) as {
            data: BytesLike;
          };

          await expect(
            instance
              .connect(deployer)
              [
                '$functionCallWithValue(address,bytes,uint256,bytes4)'
              ](target, data, 0, ethers.randomBytes(4)),
          ).to.be.revertedWith(revertReason);
        });

        it('target contract reverts, with provided custom error', async () => {
          // unrelated custom error, but it must exist on the contract due to limitiations with revertedWithCustomError matcher
          const customError = 'AddressUtils__InsufficientBalance';
          const revertReason =
            placeholder.interface.getError(customError)?.selector!;

          const targetContract = await new AddressUtils__factory(
            deployer,
          ).deploy();

          await expect(
            instance
              .connect(deployer)
              [
                '$functionCallWithValue(address,bytes,uint256,bytes4)'
              ](await targetContract.getAddress(), '0x', 0, revertReason),
          ).to.be.revertedWithCustomError(instance, customError);
        });
      });
    });

    describe('#functionDelegateCall(address,bytes)', () => {
      it('returns the bytes representation of the return value of the target function', async () => {
        const targetContract = await new $Ownable__factory(deployer).deploy();
        const target = await targetContract.getAddress();

        // use delegatecall to set the owner in storage, so that a non-zero value can be returned
        const { data: setOwnerData } =
          (await targetContract.$_setOwner.populateTransaction(
            ethers.ZeroAddress,
          )) as {
            data: BytesLike;
          };

        await instance['$functionDelegateCall(address,bytes)'](
          target,
          setOwnerData,
        );

        const { data } = (await targetContract.owner.populateTransaction()) as {
          data: BytesLike;
        };

        expect(
          await instance['$functionDelegateCall(address,bytes)'].staticCall(
            target,
            data,
          ),
        ).to.equal(ethers.zeroPadValue(ethers.hexlify(ethers.ZeroAddress), 32));
      });

      describe('reverts if', () => {
        it('target is not a contract', async () => {
          await expect(
            instance['$functionDelegateCall(address,bytes)'](
              ethers.ZeroAddress,
              '0x',
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'AddressUtils__NotContract',
          );
        });

        it('target contract reverts, with target contract error message', async () => {
          const targetContract = await new $Ownable__factory(deployer).deploy();

          const { data } =
            (await targetContract.transferOwnership.populateTransaction(
              ethers.ZeroAddress,
            )) as { data: BytesLike };

          await expect(
            instance
              .connect(deployer)
              [
                '$functionDelegateCall(address,bytes)'
              ](await targetContract.getAddress(), data),
          ).to.be.revertedWithCustomError(targetContract, 'Ownable__NotOwner');
        });

        it('target contract reverts, with default error message', async () => {
          const targetContract = await new AddressUtils__factory(
            deployer,
          ).deploy();

          await expect(
            instance
              .connect(deployer)
              [
                '$functionDelegateCall(address,bytes)'
              ](await targetContract.getAddress(), '0x'),
          ).to.be.revertedWithCustomError(
            placeholder,
            'AddressUtils__FailedDelegatecall',
          );
        });
      });
    });

    describe('#functionDelegateCall(address,bytes,bytes4)', () => {
      it('todo');
    });
  });
});
