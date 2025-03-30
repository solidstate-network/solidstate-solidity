import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  Bytes32Test__factory,
  $Bytes32,
  $Bytes32__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Bytes32', async () => {
  let instance: $Bytes32;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Bytes32__factory(deployer).deploy();
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
        const testInstance = await new Bytes32Test__factory(deployer).deploy();

        expect(
          await testInstance.sanitizeAddressTest(ethers.ZeroAddress),
        ).to.hexEqual(ethers.ZeroAddress);
      });
    });

    describe('#toBool(bytes32)', () => {
      it('returns the bool representation of bytes', async () => {
        expect(
          await instance.$toBool.staticCall(
            '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
          ),
        ).to.be.true;
        expect(
          await instance.$toBool.staticCall(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00',
          ),
        ).to.be.true;
        expect(
          await instance.$toBool.staticCall(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          ),
        ).to.be.true;
        expect(
          await instance.$toBool.staticCall(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01',
          ),
        ).to.be.true;
      });

      it('sanitizes higher-order bits as true', async () => {
        const testInstance = await new Bytes32Test__factory(deployer).deploy();

        expect(await testInstance.sanitizeBoolTest(false)).to.hexEqual('0x01');
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

    describe('#toBuilder(bytes32)', () => {
      it('returns Bytes32Builder struct with max length', async () => {
        const data = ethers.hexlify(ethers.randomBytes(32));

        expect(await instance['$toBuilder(bytes32)'](data)).to.deep.eq([
          data,
          256,
        ]);
      });
    });

    describe('#toBuilder(bytes32,uint256)', () => {
      it('returns Bytes32Builder struct with specified length', async () => {
        const data = ethers.hexlify(ethers.randomBytes(32));

        for (let i = 0n; i <= 256n; i += 8n) {
          expect(
            await instance['$toBuilder(bytes32,uint256)'](data, i),
          ).to.deep.eq([data, i]);
        }
      });
    });
  });
});
