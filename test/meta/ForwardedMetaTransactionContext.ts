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
  fn: TypedContractMethod<[], [string], 'view'>,
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
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $ForwardedMetaTransactionContext__factory(
      deployer,
    ).deploy();
  });

  // TODO: spec

  describe('__internal', () => {
    describe('#_msgSender()', () => {
      it('returns message sender if sender is not trusted forwarder', async () => {
        expect(
          await callMetaTransaction(
            deployer,
            instance.$_msgSender,
            ethers.randomBytes(20),
          ),
        ).to.deep.equal([await deployer.getAddress()]);
      });

      it('returns forwarded sender if sender is trusted forwarder', async () => {
        const trustedForwarder = await ethers.getImpersonatedSigner(
          await instance.getAddress(),
        );
        await instance.$_addTrustedForwarder(
          await trustedForwarder.getAddress(),
        );

        const forwardedAddress = ethers.hexlify(ethers.randomBytes(20));

        expect(
          await callMetaTransaction(
            trustedForwarder,
            instance.$_msgSender,
            forwardedAddress,
          ),
        ).to.deep.equal([forwardedAddress]);
      });
    });

    describe('#_msgData()', () => {
      it('returns complete message data if sender is not trusted forwarder', async () => {
        const nonSuffixedData = instance.$_msgData.fragment.selector;
        const data = ethers.randomBytes(20);

        // message data is returned as received, demonstrating the malleability of msg.data

        expect(
          await callMetaTransaction(deployer, instance.$_msgData, data),
        ).to.deep.equal([ethers.concat([nonSuffixedData, data])]);
      });

      it('returns message data without suffix if sender is trusted forwarder', async () => {
        const trustedForwarder = await ethers.getImpersonatedSigner(
          await instance.getAddress(),
        );
        await instance.$_addTrustedForwarder(
          await trustedForwarder.getAddress(),
        );

        const nonSuffixedData = instance.$_msgData.fragment.selector;

        expect(
          await callMetaTransaction(
            trustedForwarder,
            instance.$_msgData,
            ethers.randomBytes(20),
          ),
        ).to.deep.equal([nonSuffixedData]);
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
        expect(await instance.$_isTrustedForwarder(await deployer.getAddress()))
          .to.be.false;
        expect(await instance.$_isTrustedForwarder(await instance.getAddress()))
          .to.be.false;

        await instance.$_addTrustedForwarder(await instance.getAddress());

        expect(await instance.$_isTrustedForwarder(await instance.getAddress()))
          .to.be.true;
      });
    });

    describe('#_addTrustedForwarder(address)', () => {
      it('grants trusted forwarder status to account', async () => {
        await instance.$_addTrustedForwarder(await instance.getAddress());

        expect(await instance.$_isTrustedForwarder(await instance.getAddress()))
          .to.be.true;
      });

      describe('reverts if', () => {
        it('account is not a contract', async () => {
          // this is enforced via a code check
          // there's an exception for address(this), but this is difficult to test here
          await expect(
            instance.$_addTrustedForwarder(ethers.ZeroAddress),
          ).to.be.revertedWithCustomError(
            instance,
            'ForwardedMetaTransactionContext__TrustedForwarderMustBeContract',
          );
        });
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
