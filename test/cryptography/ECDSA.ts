import { hashData, signData } from '@solidstate/library';
import { ECDSAMock, ECDSAMock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const MAX_S_VALUE =
  '0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0';

describe('ECDSA', () => {
  let instance: ECDSAMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ECDSAMock__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#recover(bytes32,bytes)', () => {
      it('returns message signer', async () => {
        const [signer] = await ethers.getSigners();

        const data = {
          types: ['uint256'],
          values: [1],
          nonce: 1,
          address: await instance.getAddress(),
        };

        const hash = hashData(data);
        const sig = await signData(signer, data);

        expect(
          await instance.recover.staticCall(
            ethers.solidityPackedKeccak256(
              ['string', 'bytes32'],
              ['\x19Ethereum Signed Message:\n32', hash],
            ),
            sig,
          ),
        ).to.equal(signer.address);
      });

      describe('reverts if', () => {
        it('signaure length is invalid', async () => {
          await expect(
            instance.recover.staticCall(
              ethers.randomBytes(32),
              ethers.randomBytes(64),
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ECDSA__InvalidSignatureLength',
          );

          await expect(
            instance.recover.staticCall(
              ethers.randomBytes(32),
              ethers.randomBytes(66),
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ECDSA__InvalidSignatureLength',
          );
        });
      });
    });

    describe('#recover(bytes32,uint8,bytes32,bytes32)', () => {
      it('returns message signer', async () => {
        const [signer] = await ethers.getSigners();

        const data = {
          types: ['uint256'],
          values: [1n],
          nonce: 1n,
          address: await instance.getAddress(),
        };

        const hash = hashData(data);
        const sig = await signData(signer, data);

        const r = ethers.dataSlice(sig, 0, 32);
        const s = ethers.dataSlice(sig, 32, 64);
        const v = ethers.dataSlice(sig, 64, 65);

        expect(
          await instance.recover.staticCall(
            ethers.solidityPackedKeccak256(
              ['string', 'bytes32'],
              ['\x19Ethereum Signed Message:\n32', hash],
            ),
            v,
            r,
            s,
          ),
        ).to.equal(signer.address);
      });

      describe('reverts if', () => {
        it('S is invalid', async () => {
          const hash = ethers.randomBytes(32);
          const v = 27;
          const r = ethers.randomBytes(32);

          // s must be less than or equal to MAX_S_VALUE

          await expect(
            instance.recover.staticCall(
              hash,
              v,
              r,
              ethers.toQuantity(BigInt(MAX_S_VALUE) + 1n),
            ),
          ).to.be.revertedWithCustomError(instance, 'ECDSA__InvalidS');
        });

        it('V is invalid', async () => {
          const hash = ethers.randomBytes(32);
          const r = ethers.randomBytes(32);
          const s = MAX_S_VALUE;

          // V must be 27 or 28

          for (let v = 0; v <= 26; v++) {
            await expect(
              instance.recover.staticCall(hash, v, r, s),
            ).to.be.revertedWithCustomError(instance, 'ECDSA__InvalidV');
          }

          for (let v = 29; v <= 255; v++) {
            await expect(
              instance.recover.staticCall(hash, v, r, s),
            ).to.be.revertedWithCustomError(instance, 'ECDSA__InvalidV');
          }
        });

        it('recovered signature is invalid', async () => {
          const v = 27;
          const s = MAX_S_VALUE;

          // hash and r generated randomly, known not to yield valid signer

          await expect(
            instance.recover.staticCall(
              '0xfb78d190a6ff9c55a28ae24c65cb006029ae15140557db9017a6474592d3fd59',
              v,
              '0xe1a6fa655db25741b29a03d2f8ec44fb5590d0a1ce91c789886b59e54c08f509',
              s,
            ),
          ).to.be.revertedWithCustomError(instance, 'ECDSA__InvalidSignature');
        });
      });
    });

    describe('#toEthSignedMessageHash(bytes32)', () => {
      it('returns hash of signed message prefix and message', async () => {
        const hash = ethers.keccak256(ethers.toUtf8Bytes('test'));

        expect(await instance.toEthSignedMessageHash.staticCall(hash)).to.equal(
          ethers.solidityPackedKeccak256(
            ['string', 'bytes32'],
            ['\x19Ethereum Signed Message:\n32', hash],
          ),
        );
      });
    });
  });
});
