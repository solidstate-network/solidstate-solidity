import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  Bytes32UtilsTest__factory,
  $Bytes32Utils,
  $Bytes32Utils__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Bytes32Utils', async () => {
  let instance: $Bytes32Utils;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Bytes32Utils__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#toAddress(bytes32)', () => {
      it('returns the 20 lower-order bytes as address', async () => {
        const input = ethers.ZeroAddress.replace(
          '0x',
          '0xffffffffffffffffffffffff',
        );

        expect(await instance.$toAddress.staticCall(input)).to.eq(
          ethers.ZeroAddress,
        );
      });

      it('sanitizes higher-order bits', async () => {
        const testInstance = await new Bytes32UtilsTest__factory(
          deployer,
        ).deploy();

        expect(
          await testInstance.sanitizeAddressTest(ethers.ZeroAddress),
        ).to.hexEqual(ethers.ZeroAddress);
      });
    });

    describe('#toBool(bytes32)', () => {
      it('returns the lowest-order bit as bool', async () => {
        expect(
          await instance.$toBool.staticCall(
            '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
          ),
        ).to.be.false;
        expect(
          await instance.$toBool.staticCall(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          ),
        ).to.be.true;
      });

      it('sanitizes higher-order bits', async () => {
        const testInstance = await new Bytes32UtilsTest__factory(
          deployer,
        ).deploy();

        expect(await testInstance.sanitizeBoolTest(false)).to.hexEqual('0x00');
        expect(await testInstance.sanitizeBoolTest(true)).to.hexEqual('0x01');
      });
    });

    describe('#toInt256(bytes32)', () => {
      it('returns the uint256 representation of bytes', async () => {
        expect(await instance.$toInt256.staticCall(ethers.ZeroHash)).to.eq(0n);

        expect(
          await instance.$toInt256.staticCall(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          ),
        ).to.eq(-1n);

        expect(
          await instance.$toInt256.staticCall(
            '0x8000000000000000000000000000000000000000000000000000000000000000',
          ),
        ).to.eq(ethers.MinInt256);

        expect(
          await instance.$toInt256.staticCall(
            '0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          ),
        ).to.eq(ethers.MaxInt256);
      });
    });

    describe('#toUint256(bytes32)', () => {
      it('returns the uint256 representation of bytes', async () => {
        const input = ethers.hexlify(ethers.randomBytes(32));

        expect(await instance.$toUint256.staticCall(input)).to.eq(
          BigInt(input),
        );
      });
    });

    describe('#toString(bytes32)', () => {
      it('returns a hex string representation of bytes', async () => {
        const value = ethers.zeroPadValue(await deployer.getAddress(), 32);

        expect(await instance.$toString.staticCall(value)).to.eq(value);
      });
    });
  });
});
