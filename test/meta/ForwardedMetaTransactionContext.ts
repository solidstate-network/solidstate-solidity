import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $ForwardedMetaTransactionContext,
  $ForwardedMetaTransactionContext__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ForwardedMe$ForwardedMetaTransactionContext', () => {
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
      it('returns message sender is sender is not trusted forwarder', async () => {
        const tx = await instance.$_msgSender.populateTransaction();
        tx.data = ethers.concat([tx.data, ethers.randomBytes(20)]);

        const result = await deployer.call(tx);
        const decoded = instance.interface.decodeFunctionResult(
          '$_msgSender',
          result,
        );

        expect(decoded).to.deep.equal([await deployer.getAddress()]);
      });

      it('returns forwarded sender if sender is trusted forwarder', async () => {
        const trustedForwarder = await ethers.getImpersonatedSigner(
          await instance.getAddress(),
        );
        await instance.$_addTrustedForwarder(
          await trustedForwarder.getAddress(),
        );

        const forwardedAddress = ethers.hexlify(ethers.randomBytes(20));

        const tx = await instance.$_msgSender.populateTransaction();
        tx.data = ethers.concat([tx.data, forwardedAddress]);

        const result = await trustedForwarder.call(tx);
        const decoded = instance.interface.decodeFunctionResult(
          '$_msgSender',
          result,
        );

        expect(decoded).to.deep.equal([forwardedAddress]);
      });
    });

    describe('#_msgData()', () => {
      it('returns complete message data if sender is not trusted forwarder', async () => {
        const tx = await instance.$_msgData.populateTransaction();
        tx.data = ethers.concat([tx.data, ethers.randomBytes(20)]);

        // message data is returned as received, demonstrating the malleability of msg.data

        const result = await deployer.call(tx);
        const decoded = instance.interface.decodeFunctionResult(
          '$_msgData',
          result,
        );

        expect(decoded).to.deep.equal([tx.data]);
      });

      it('returns message data without suffix if sender is trusted forwarder', async () => {
        const trustedForwarder = await ethers.getImpersonatedSigner(
          await instance.getAddress(),
        );
        await instance.$_addTrustedForwarder(
          await trustedForwarder.getAddress(),
        );

        const tx = await instance.$_msgData.populateTransaction();
        const nonSuffixedData = tx.data;
        tx.data = ethers.concat([tx.data, ethers.randomBytes(20)]);

        // message data is returned as received, demonstrating the malleability of msg.data

        const result = await trustedForwarder.call(tx);
        const decoded = instance.interface.decodeFunctionResult(
          '$_msgData',
          result,
        );

        expect(decoded).to.deep.equal([nonSuffixedData]);
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
