import { expect } from 'chai';
import { ethers } from 'hardhat';
import { hashData, signData } from '@solidstate/library';
import { ECDSAMock, ECDSAMock__factory } from '../../typechain';

describe('ECDSA', function () {
  let instance: ECDSAMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ECDSAMock__factory(deployer).deploy();
  });

  describe('__internal', function () {
    describe('#recover', function () {
      describe('(bytes32,bytes)', function () {
        it('returns message signer', async function () {
          const [signer] = await ethers.getSigners();

          const data = {
            types: ['uint256'],
            values: [ethers.constants.One],
            nonce: ethers.constants.One,
            address: instance.address,
          };

          const hash = hashData(data);
          const sig = await signData(signer, data);

          expect(
            await instance.callStatic['recover(bytes32,bytes)'](
              ethers.utils.solidityKeccak256(
                ['string', 'bytes32'],
                ['\x19Ethereum Signed Message:\n32', hash],
              ),
              sig,
            ),
          ).to.equal(signer.address);
        });
      });

      describe('(bytes32,uint8,bytes32,bytes32)', function () {
        it('todo');
      });
    });

    describe('#toEthSignedMessageHash', function () {
      it('returns hash of signed message prefix and message', async function () {
        const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('test'));

        expect(await instance.callStatic.toEthSignedMessageHash(hash)).to.equal(
          ethers.utils.solidityKeccak256(
            ['string', 'bytes32'],
            ['\x19Ethereum Signed Message:\n32', hash],
          ),
        );
      });
    });
  });
});
