import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $ForwardedMetaTransactionContext,
  $ForwardedMetaTransactionContext__factory,
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

describe('ForwardedMetaTransactionContext', () => {
  let instance: $ForwardedMetaTransactionContext;
  let trustedForwarder: SignerWithAddress;
  let nonTrustedForwarder: SignerWithAddress;

  beforeEach(async () => {
    let deployer;
    [deployer, trustedForwarder, nonTrustedForwarder] =
      await ethers.getSigners();
    instance = await new $ForwardedMetaTransactionContext__factory(
      deployer,
    ).deploy();

    await instance.$_addTrustedForwarder(await trustedForwarder.getAddress());
  });

  // TODO: spec

  describe('__internal', () => {
    describe('#_msgSender()', () => {
      it('returns forwarded sender if sender is trusted forwarder', async () => {
        const forwardedAddress = ethers.hexlify(ethers.randomBytes(20));

        expect(
          await callMetaTransaction(
            trustedForwarder,
            instance.$_msgSender,
            forwardedAddress,
          ),
        ).to.deep.equal([forwardedAddress]);
      });

      it('returns message sender if sender is not trusted forwarder', async () => {
        expect(
          await callMetaTransaction(
            nonTrustedForwarder,
            instance.$_msgSender,
            ethers.randomBytes(20),
          ),
        ).to.deep.equal([await nonTrustedForwarder.getAddress()]);
      });

      it('returns message sender if message data length is less than suffix length', async () => {
        // account for 4-byte selector when calculting suffix length
        const suffix = ethers.randomBytes(
          Number(
            (await instance.$_calldataSuffixLength.staticCall()) - 4n - 1n,
          ),
        );

        expect(
          await callMetaTransaction(
            trustedForwarder,
            instance.$_msgSender,
            suffix,
          ),
        ).to.deep.equal([await trustedForwarder.getAddress()]);
      });
    });

    describe('#_msgData()', () => {
      it('returns message data without suffix if sender is trusted forwarder', async () => {
        const nonSuffixedData = instance.$_msgData.fragment.selector;

        expect(
          await callMetaTransaction(
            trustedForwarder,
            instance.$_msgData,
            ethers.randomBytes(20),
          ),
        ).to.deep.equal([nonSuffixedData]);
      });

      it('returns complete message data if sender is not trusted forwarder', async () => {
        const nonSuffixedData = instance.$_msgData.fragment.selector;
        const data = ethers.randomBytes(20);

        // message data is returned as received, demonstrating the malleability of msg.data

        expect(
          await callMetaTransaction(
            nonTrustedForwarder,
            instance.$_msgData,
            data,
          ),
        ).to.deep.equal([ethers.concat([nonSuffixedData, data])]);
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
          await callMetaTransaction(
            trustedForwarder,
            instance.$_msgData,
            suffix,
          ),
        ).to.deep.equal([ethers.concat([nonSuffixedData, suffix])]);
      });
    });

    describe('#_calldataSuffixLength()', () => {
      it('returns 20', async () => {
        expect(await instance.$_calldataSuffixLength.staticCall()).to.equal(
          20n,
        );
      });
    });

    describe('#_isTrustedForwarder(address)', () => {
      it('returns trusted forwarder status of account', async () => {
        expect(
          await instance.$_isTrustedForwarder(
            await nonTrustedForwarder.getAddress(),
          ),
        ).to.be.false;

        expect(
          await instance.$_isTrustedForwarder(
            await trustedForwarder.getAddress(),
          ),
        ).to.be.true;
      });
    });

    describe('#_addTrustedForwarder(address)', () => {
      it('grants trusted forwarder status to account', async () => {
        await instance.$_addTrustedForwarder(await instance.getAddress());

        expect(await instance.$_isTrustedForwarder(await instance.getAddress()))
          .to.be.true;
      });
    });

    describe('#_removeTrustedForwarder(address)', () => {
      it('revokes trusted forwarder status from account', async () => {
        await instance.$_addTrustedForwarder(await instance.getAddress());
        await instance.$_removeTrustedForwarder(await instance.getAddress());

        expect(await instance.$_isTrustedForwarder(await instance.getAddress()))
          .to.be.false;
      });
    });
  });
});
