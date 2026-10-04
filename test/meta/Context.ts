import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { type $Context, $Context__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import { network } from 'hardhat';

const connection = await network.create();

describe('Context', () => {
  let instance: $Context;
  let deployer: HardhatEthersSigner;

  beforeEach(async () => {
    [deployer] = await connection.ethers.getSigners();
    instance = await new $Context__factory(deployer).deploy();
  });

  describe('#_msgSender()', () => {
    it('returns message sender', async () => {
      const tx = await instance.$_msgSender.populateTransaction();
      tx.data = ethers.concat([tx.data, ethers.randomBytes(20)]);

      const result = await deployer.call(tx);
      const decoded = instance.interface.decodeFunctionResult(
        '$_msgSender',
        result,
      );

      expect(decoded).to.deep.equal([await deployer.getAddress()]);
    });
  });

  describe('#_msgData()', () => {
    it('returns complete message data', async () => {
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
  });

  describe('#_calldataSuffixLength()', () => {
    it('returns 0', async () => {
      expect(await instance.$_calldataSuffixLength.staticCall()).to.equal(0n);
    });
  });
});
