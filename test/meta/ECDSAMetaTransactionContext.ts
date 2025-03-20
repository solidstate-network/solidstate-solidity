import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { signECDSAMetaTransaction } from '@solidstate/library';
import {
  $ECDSAMetaTransactionContext,
  $ECDSAMetaTransactionContext__factory,
} from '@solidstate/typechain-types';
import { TypedContractMethod } from '@solidstate/typechain-types/common';
import { expect } from 'chai';
import { BytesLike, ContractMethodArgs } from 'ethers';
import { ethers } from 'hardhat';

const callMetaTransaction = async (
  signer: SignerWithAddress,
  fn: TypedContractMethod<[], [string], 'nonpayable' | 'payable' | 'view'>,
  data: BytesLike,
  args: ContractMethodArgs<[]> = [],
) => {
  const tx = await fn.populateTransaction(...args);
  tx.data = ethers.concat([tx.data, data]);

  const result = await signer.call(tx);

  return new ethers.Interface([fn.fragment]).decodeFunctionResult(
    fn.name,
    result,
  );
};

describe('ECDSAMetaTransactionContext', () => {
  let instance: $ECDSAMetaTransactionContext;
  let deployer: SignerWithAddress;
  let forwarder: SignerWithAddress;
  let signer: SignerWithAddress;

  beforeEach(async () => {
    [deployer, forwarder, signer] = await ethers.getSigners();
    instance = await new $ECDSAMetaTransactionContext__factory(
      deployer,
    ).deploy();
  });

  // TODO: spec

  // TODO: test multiple calls in same tx to validate that transient storage is used correctly

  describe('__internal', () => {
    describe('#_msgSender()', () => {
      it('returns signer if signature is valid', async () => {
        const data = instance.$_msgSender.fragment.selector;
        const nonce = 1n;

        const signature = await signECDSAMetaTransaction(
          instance,
          signer,
          data,
          nonce,
        );

        const suffix = ethers.concat([
          ethers.toBeHex(nonce, 32),
          signature.serialized,
        ]);

        expect(
          await callMetaTransaction(forwarder, instance.$_msgSender, suffix),
        ).to.deep.equal([await signer.getAddress()]);
      });

      it('returns message sender if signature is invalid', async () => {
        const suffix = ethers.randomBytes(
          Number(await instance.$_calldataSuffixLength.staticCall()),
        );

        expect(
          await callMetaTransaction(forwarder, instance.$_msgSender, suffix),
        ).to.deep.equal([await forwarder.getAddress()]);
      });

      it('returns message sender if message data length is less than suffix length', async () => {
        // account for 4-byte selector when calculting suffix length
        const suffix = ethers.randomBytes(
          Number(
            (await instance.$_calldataSuffixLength.staticCall()) - 4n - 1n,
          ),
        );

        expect(
          await callMetaTransaction(forwarder, instance.$_msgSender, suffix),
        ).to.deep.equal([await forwarder.getAddress()]);
      });
    });

    describe('#_msgData()', () => {
      it('returns message data without suffix if signature is valid', async () => {
        const nonSuffixedData = instance.$_msgData.fragment.selector;
        const nonce = 1n;

        const signature = await signECDSAMetaTransaction(
          instance,
          signer,
          nonSuffixedData,
          nonce,
        );

        const suffix = ethers.concat([
          ethers.toBeHex(nonce, 32),
          signature.serialized,
        ]);

        expect(
          await callMetaTransaction(forwarder, instance.$_msgData, suffix),
        ).to.deep.equal([nonSuffixedData]);
      });

      it('returns complete message data if signature is invalid', async () => {
        const nonSuffixedData = instance.$_msgData.fragment.selector;
        const suffix = ethers.randomBytes(
          Number(await instance.$_calldataSuffixLength.staticCall()),
        );

        // message data is returned as received, demonstrating the malleability of msg.data

        expect(
          await callMetaTransaction(forwarder, instance.$_msgData, suffix),
        ).to.deep.equal([ethers.concat([nonSuffixedData, suffix])]);
      });

      it('returns complete message data if message data length is less than suffix length', async () => {
        const nonSuffixedData = instance.$_msgData.fragment.selector;
        // account for 4-byte selector when calculting suffix length
        const suffix = ethers.randomBytes(
          Number(
            (await instance.$_calldataSuffixLength.staticCall()) - 4n - 1n,
          ),
        );

        // message data is returned as received, demonstrating the malleability of msg.data

        expect(
          await callMetaTransaction(forwarder, instance.$_msgData, suffix),
        ).to.deep.equal([ethers.concat([nonSuffixedData, suffix])]);
      });
    });

    describe('#_calldataSuffixLength()', () => {
      it('returns 97', async () => {
        expect(await instance.$_calldataSuffixLength.staticCall()).to.equal(
          97n,
        );
      });
    });
  });
});
